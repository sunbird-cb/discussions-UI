import { Component, OnInit } from '@angular/core'
import { NSDiscussData } from '../../models/discuss.model'
import { Router, ActivatedRoute } from '@angular/router'
import { DiscussionService } from '../../services/discussion.service';
/* tslint:disable */
import _ from 'lodash'
import { Subscriber, Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from './../../common/constants.json';
import { DiscussUtilsService } from '../../services/discuss-utils.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';

@Component({
  selector: 'lib-tag-all-discussion',
  templateUrl: './tag-all-discussion.component.html',
  styleUrls: ['./tag-all-discussion.component.scss']
})
export class TagAllDiscussionComponent implements OnInit {

  tagName!: any
  similarPosts :any[]
  queryParam: any
  fetchSingleCategoryLoader = false
  currentActivePage: 1
  defaultError = 'Something went wrong, Please try again after sometime!'
  pager = {}
  paginationData!: any
  fetchNewData = false
  paramsSubscription: Subscription;
  getParams: any;
  cIds: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private discussService: DiscussionService, 
    public activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private telemetryUtils: TelemetryUtilsService,
    private discussUtils: DiscussUtilsService
  ) { }

  ngOnInit() {

    this.cIds = this.configService.getCategories()
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tagName = params.tagname
    })
    // To check wheather any contexts are there or not from the config service
    if (this.configService.hasContext()) {
      this.fetchContextBasedTagDetails(this.tagName, this.cIds, this.currentActivePage)
    } else {
      this.fetchSingleTagDetails(this.tagName, this.currentActivePage)
    }

  }

  /**Method to fetch the tag based discussion */
  fetchSingleTagDetails(tagname: string, page?: any) {
    this.fetchSingleCategoryLoader = true
    this.discussService.getTagBasedDiscussion(tagname).subscribe(
      (data: NSDiscussData.IDiscussionData) => {
        this.similarPosts = data.topics
        this.paginationData = data.pagination
        this.fetchSingleCategoryLoader = false
        this.setPagination()
      },
      (err: any) => {
        console.error('Error in fetching single tag details', err)
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError)
        this.fetchSingleCategoryLoader = false
      })
  }

  /** Method to fetch the context based discussions */
  fetchContextBasedTagDetails(tagname: string, cid: any, page?: any) {
    this.fetchSingleCategoryLoader = true
    const req = {
      cid: cid.result,
      tag: tagname
    };

    this.discussService.getContextBasedTagDiscussion(req).subscribe(
      (data: NSDiscussData.IDiscussionData) => {
        this.similarPosts = data.result
        // this.paginationData = data.pagination
        this.fetchSingleCategoryLoader = false
        this.setPagination()
      },
      (err: any) => {
        console.error('Error in fetching context based tag details', err)
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError)
        this.fetchSingleCategoryLoader = false
      })
  }


  // TODO : for pagination
  // getNextData(tagname: string, page: any) {
  //   return this.discussService.fetchNextTagD(tagname, page).subscribe(
  //     (data: any) => {
  //       this.paginationData = data.pagination
  //       this.setPagination()
  //       this.similarPosts = _.get(data, 'topics')
  //     })
  // }

  setPagination() {
    this.pager = {
      startIndex: this.paginationData.first.page,
      endIndex: this.paginationData.last.page,
      pages: this.paginationData.pages,
      currentPage: this.paginationData.currentPage,
      totalPage: this.paginationData.pageCount,
    }
  }

  navigateWithPage(page: any) {
    if (page !== this.currentActivePage) {
      this.fetchNewData = true
      this.router.navigate([`${this.configService.getRouterSlug()}${CONSTANTS.ROUTES.TAG}tag-discussions`], { queryParams: { page, tagname: this.queryParam } });
    }
  }

  /** Method to navigate to the dicussion detail page on click of tag related discussion */
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

  logTelemetry(event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
  }

  // TODO: add refershdata function
  // refreshData(tagname: string, page: any) {
  //   if (this.fetchNewData) {
  //     // this.getNextData(tagname, page)
  //   }
  // }

  // for tag color
  public getBgColor(tagTitle: any) {
    const bgColor = this.discussUtils.stringToColor(tagTitle.toLowerCase());
    const color = this.discussUtils.getContrast();
    return { color, 'background-color': bgColor };
  }

}
