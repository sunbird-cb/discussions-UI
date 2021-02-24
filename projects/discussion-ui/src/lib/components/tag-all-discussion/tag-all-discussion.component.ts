import { Component, OnInit } from '@angular/core'
import { NSDiscussData } from '../../models/discuss.model'
import { Router, ActivatedRoute } from '@angular/router'
import { DiscussionService } from '../../services/discussion.service';
/* tslint:disable */
import _ from 'lodash'
import { Subscriber, Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from './../../common/constants.json';

@Component({
  selector: 'lib-tag-all-discussion',
  templateUrl: './tag-all-discussion.component.html',
  styleUrls: ['./tag-all-discussion.component.scss']
})
export class TagAllDiscussionComponent implements OnInit {

  tagName!: any
  similarPosts!: any
  queryParam: any
  fetchSingleCategoryLoader = false
  currentActivePage!: any
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
    private discussService: DiscussionService, public activatedRoute: ActivatedRoute,
    private configService: ConfigService,
  ) { }

  ngOnInit() {

    this.getParams = this.configService.getConfig()
    this.cIds = _.get(this.getParams, 'categories')

    this.activatedRoute.queryParams.subscribe((params) => {
      this.tagName = params.tagname
    })
    if (this.cIds.result.length) {
      this.fetchContextBasedTagDetails(this.tagName, this.cIds, this.currentActivePage)
    } else {
      this.currentActivePage = 1
      this.fetchSingleTagDetails(this.tagName, this.currentActivePage)
    }

  }

  fetchSingleTagDetails(tagname: string, page: any) {
    this.fetchSingleCategoryLoader = true
    this.discussService.getTagBasedDiscussion(tagname).subscribe(
      (data: NSDiscussData.IDiscussionData) => {
        this.similarPosts = data.topics
        this.paginationData = data.pagination
        this.fetchSingleCategoryLoader = false
        this.setPagination()
      },
      (err: any) => {
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError)
        this.fetchSingleCategoryLoader = false
      })
  }

  fetchContextBasedTagDetails(tagname: string, cid: any, page: any) {
    this.fetchSingleCategoryLoader = true
    const req = {
      request: {
        cid: cid.result,
        tag: tagname
      }
    };

    this.discussService.getContextBasedTagDiscussion(req).subscribe(
      (data: NSDiscussData.IDiscussionData) => {
        this.similarPosts = data.result
        // this.paginationData = data.pagination
        this.fetchSingleCategoryLoader = false
        this.setPagination()
      },
      (err: any) => {
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError)
        this.fetchSingleCategoryLoader = false
      })
  }

  // private openSnackbar(primaryMsg: string, duration: number = 5000) {
  //   this.snackBar.open(primaryMsg, 'X', {
  //     duration,
  //   })
  // }

  // for pagination
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

      let routerSlug = this.configService.getConfig().routerSlug ? this.configService.getConfig().routerSlug : ''
      this.router.navigate([`${routerSlug}${CONSTANTS.ROUTES.TAG}tag-discussions`], { queryParams: { page, tagname: this.queryParam } });
    }
  }

  refreshData(tagname: string, page: any) {
    if (this.fetchNewData) {
      // this.getNextData(tagname, page)
    }
  }

  // for tag color
  public getBgColor(tagTitle: any) {
    const bgColor = this.stringToColor(tagTitle.toLowerCase());
    const color = this.getContrast();
    return { color, 'background-color': bgColor };
  }

  stringToColor(title) {
    let hash = 0;

    for (let i = 0; i < title.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    // tslint:disable-next-line: prefer-template
    const colour = 'hsl(' + hue + ',100%,30%)';
    return colour;
  }

  getContrast() {
    return 'rgba(255, 255, 255, 80%)';
  }

}
