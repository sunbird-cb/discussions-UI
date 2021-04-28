import { CONTEXT_PROPS } from './../../services/discussion.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class DiscussHomeComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollContainerHeight', { static: false }) elementView: ElementRef;
  discussionList = [];
  routeParams: any;
  showStartDiscussionModal = false;
  categoryId: string;
  isTopicCreator = false;
  showLoader = false;
  pagination = Object.create({});

  // Input parameters for infinite scroll
  InfiniteScrollConfig = {
    modalScrollDistance: 2,
    modalScrollThrottle: 50
  };

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
  /**
   * @description - set the scroll container height
   */
  ngAfterViewChecked() {
    if (this.elementView && this.elementView.nativeElement) {
      // the number 10 is just a random value to reduce the height of the parent container to the infinite scroll
      this.elementView.nativeElement.style.height = (this.elementView.nativeElement.clientHeight - 10) + 'px';
    }
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
    const scrollIndex = this.pagination.currentPage ? this.pagination.currentPage : 1;
    this.discussionService.getContextBasedTopic(slug, scrollIndex).subscribe(data => {
      this.pagination = data.pagination;
      this.showLoader = false;
      this.isTopicCreator = _.get(data, 'privileges.topics:create') === true ? true : false;
      this.discussionList = [...this.discussionList, ...(_.union(_.get(data, 'topics'), _.get(data, 'children')))];
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
      this.pagination.currentPage = this.pagination.first.page;
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    }
    this.showStartDiscussionModal = false;
  }

  /**
   * @description - call the topic get api when scrolled down and setting the limit of API Call
   */
  onModalScrollDown() {
    if (this.pagination.currentPage !== this.pagination.pageCount) {
      this.pagination.currentPage = this.pagination.next.page;
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    }
  }
}
