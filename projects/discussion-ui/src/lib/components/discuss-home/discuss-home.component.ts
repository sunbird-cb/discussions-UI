import { CONTEXT_PROPS } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import * as CONSTANTS from './../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { NSDiscussData } from '../../models/discuss.model';
import { ConfigService } from '../../services/config.service';
/* tslint:enable */

@Component({
  selector: 'lib-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.css']
})
export class DiscussHomeComponent implements OnInit {

  discussionList = [];
  routeParams: any;
  showStartDiscussionModal = false;
  categoryId: string;
  isTopicCreator = false;
  showLoader = false;

  // Input parameters for infinite scroll
  modalScrollDistance = 2;
  modalScrollThrottle = 500;
  scrollUpDistance = 1.5;
  containerHeight: string;

  currentPage = 0;
  pageSize: number;
  totalTopics: number;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    private telemetryUtils: TelemetryUtilsService) { }

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.categoryId = this.discussionService.getContext(CONTEXT_PROPS.cid);
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
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
    this.router.navigate([`${this.configService.getRouterSlug()}${CONSTANTS.ROUTES.TOPIC}${_.trim(_.get(discussionData, 'slug'))}`]);
  }
  /**
   * @description - To get all the topics
   * @param - required cid as a slug
   */
  getDiscussionList(slug: string) {
    this.showLoader = true;
    this.currentPage++;
    this.discussionService.getContextBasedTopic(slug, this.currentPage).subscribe(data => {
      this.showLoader = false;
      this.isTopicCreator = _.get(data, 'privileges.topics:create') === true ? true : false;
      this.discussionList = [...this.discussionList, ...(_.union(_.get(data, 'topics'), _.get(data, 'children')))];
      this.totalTopics = _.get(data, 'totalTopicCount'); // total count of topics
      if (this.currentPage === 1) {
        this.pageSize = _.get(data, 'nextStart'); // count of topics per page
        if (this.totalTopics > this.pageSize) {   // setting the scrollbar container height
          this.containerHeight = ((132 * this.pageSize)) + 'px';
        } else {
          this.containerHeight = ((132 * this.totalTopics)) + 'px';
        }
      }
    }, error => {
      this.showLoader = false;
      // TODO: Toaster
      console.log('error fetching topic list', error);
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
      this.discussionList = [];
      this.currentPage = 0;
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    }
    this.showStartDiscussionModal = false;
  }

  /**
   * @description - call the topic get api when scrolled down
   */
  onModalScrollDown() {
    const pageId = this.currentPage;
    if ((this.pageSize * pageId) < this.totalTopics) {  // should fail when it reaches the total topics
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    }
  }
}
