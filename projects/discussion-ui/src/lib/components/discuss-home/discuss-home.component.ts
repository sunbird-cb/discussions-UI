import { CONTEXT_PROPS } from './../../services/discussion.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import * as CONSTANTS from './../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { NSDiscussData } from '../../models/discuss.model';
import { ConfigService } from '../../services/config.service';
import { NavigationServiceService } from '../../navigation-service.service';
/* tslint:enable */

@Component({
  selector: 'lib-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.css']
})
export class DiscussHomeComponent implements OnInit {
  @Input() categoryId;
  @Input() categoryHomeAction;
  @Output() stateChange: EventEmitter<any> = new EventEmitter();

  discussionList: any[];
  routeParams: any;
  showStartDiscussionModal = false;
  // categoryId: string;
  isTopicCreator = false;
  showLoader = false;
  currentActivePage: number = 1;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    private telemetryUtils: TelemetryUtilsService,
    private navigationService: NavigationServiceService) { }

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
    this.route.params.subscribe(params => {
      this.configService.setCategoryId.subscribe((categoryIds: string) => {
        this.routeParams = categoryIds;
        // categoryIds = this.discussionService.getContext(CONTEXT_PROPS.cid)
        categoryIds = this.categoryId ? this.categoryId : categoryIds
        this.getDiscussionList(categoryIds);
      })
      // this.routeParams = params;
      // this.categoryId = this.discussionService.getContext(CONTEXT_PROPS.cid);
      // this.getDiscussionList(_.get(this.routeParams, 'slug'));
    });
  }

  navigateToDiscussionDetails(discussionData) {
    const matchedTopic = _.find(this.telemetryUtils.getContext(), { type: 'Topic' });
    if (matchedTopic) {
      this.telemetryUtils.deleteContext(matchedTopic);
    }

    this.telemetryUtils.uppendContext({
      id: _.get(discussionData, 'tid'),
      type: 'Topic'
    });
    let routerSlug = this.configService.getConfig().routerSlug ? this.configService.getConfig().routerSlug : ''
    let input = { data: { url: `${routerSlug}${CONSTANTS.ROUTES.TOPIC}${_.trim(_.get(discussionData, 'slug'))}`, queryParams: {}, tid: discussionData.tid, title: discussionData.title }, action: CONSTANTS.CATEGORY_DETAILS }
    this.navigationService.navigate(input)
    this.stateChange.emit({ tid: discussionData.tid, title: discussionData.title, action: this.categoryHomeAction })
  }

  getDiscussionList(slug: string) {
    this.showLoader = true;
    // TODO : this.currentActivePage shoulb be dynamic when pagination will be implemented
    this.discussionService.getContextBasedTopic(slug, this.currentActivePage).subscribe(data => {
      this.showLoader = false;
      this.isTopicCreator = _.get(data, 'privileges.topics:create') === true ? true : false;
      this.discussionList = _.union(_.get(data, 'topics'), _.get(data, 'children'));
    }, error => {
      this.showLoader = false;
      // TODO: Toaster
      console.log('error fetching topic list');
    });
  }

  startDiscussion() {
    this.showStartDiscussionModal = true;
  }

  logTelemetry(event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
  }

  closeModal(event) {
    if (_.get(event, 'message') === 'success') {
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    }
    this.showStartDiscussionModal = false;
  }
}
