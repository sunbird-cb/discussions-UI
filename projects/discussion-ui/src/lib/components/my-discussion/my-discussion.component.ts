import { DiscussionService } from './../../services/discussion.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router } from '@angular/router';
import * as CONSTANTS from '../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { ConfigService } from '../../services/config.service';
import { combineLatest } from 'rxjs';
/* tslint:enable */

@Component({
  selector: 'lib-my-discussion',
  templateUrl: './my-discussion.component.html',
  styleUrls: ['./my-discussion.component.scss']
})
export class MyDiscussionComponent implements OnInit {

  @ViewChild('scrollContainerHeight', { static: false }) elementView: ElementRef;
  data; // this is for user
  discussionList = []; // this is for posts
  currentFilter = 'timestamp';
  department!: string | null;
  location!: string | null;
  profilePhoto!: string;
  userInitial = '';
  showLoader = false;
  pagination = Object.create({});
  recentFilter;

  // Input parameters for infinite scroll
  InfiniteScrollConfig = {
    modalScrollDistance: 2,
    modalScrollThrottle: 50
  };

  constructor(
    private discussService: DiscussionService,
    private configService: ConfigService,
    public router: Router,
    private telemetryUtils: TelemetryUtilsService) { }

  /** To fetch user details */
  fetchUserProfile(userName) {
    this.discussService.fetchUserProfile(userName).subscribe(response => {
      this.showLoader = false;
      console.log(response);
      this.data = response;
      if (_.get(this.data, 'posts')) {
        this.discussionList = _.get(this.data, 'posts').filter(p => (p.isMainPost === true));
      }
      // if (this.configSvc.userProfile) {
      //   localStorage.setItem(this.configSvc.userProfile.userId, this.profilePhoto);
      // }
    }, error => {
      this.showLoader = false;
      // TODO: Toaster
      console.log('error fetching user details');
    });
  }

  ngOnInit() {
    this.telemetryUtils.setContext([]);
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.MY_DISCUSSION);
    this.filter(this.currentFilter, false);
  }

  /**
   * @description - set the scroll container height
   */
  ngAfterViewChecked() {
    if (this.elementView && this.elementView.nativeElement && !this.elementView.nativeElement.style.height) {
      // the number 10 is just a random value to reduce the height of the parent container to the infinite scroll
      this.elementView.nativeElement.style.height = (this.elementView.nativeElement.clientHeight - 10) + 'px';
    }
  }
  
  /**
   * @param  {string|'timestamp'|'best'|'saved'|'watched'|'upvoted'|'downvoted'} key
   * @param  {boolean} resetpagination - its used to reset the pagination value based on the filter data
   */
  filter(key: string | 'timestamp' | 'best' | 'saved' | 'watched' | 'upvoted' | 'downvoted', resetpagination: boolean) {
    this.currentFilter = key;
    if (key) {
      // reset the currentpage value to 1 and reset the discussionList data based on the respective api response when the filter is changed
      if (resetpagination) {
        this.discussionList = []
        this.pagination.currentPage = 1;
        this.pagination.nextPage = 2;
      }
      // setting the current page index 
      const scrollIndex = this.pagination.currentPage ? this.pagination.currentPage : 1;
      this.showLoader = true;
      switch (key) {
        case 'timestamp':
          this.getRecentTopics(scrollIndex);
          // this.discussionList = _.uniqBy(_.filter(this.data.posts, p => _.get(p, 'isMainPost') === true), 'tid');
          break;
        case 'best':
          // this.discussionList = _.uniqBy(this.data.bestPosts, 'tid');
          this.discussService.fetchBestPost(scrollIndex).subscribe(result => {
            if (result) {
              const bestPost = result['posts'].filter(p => (p.isMainPost === true));
              this.discussionList = [...this.discussionList, ...bestPost];
              this.pagination = _.get(result, 'pagination');
              this.showLoader = false;
            } else {
              this.showLoader = false;
              this.discussionList = [];
            }
          });
          break;
        case 'saved':
          this.discussService.fetchSaved(scrollIndex).subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              this.discussionList = [...this.discussionList, ...response['posts']];
              this.pagination = _.get(response, 'pagination');
              this.showLoader = false;
            } else {
              this.showLoader = false;
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = [];
            })
          break;
        case 'watched':
          this.showLoader = false;
          this.discussionList = [];
          break;
        case 'upvoted':
          this.discussService.fetchUpvoted(scrollIndex).subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              const upvoted = response['posts'].filter(p => (p.isMainPost === true));
              this.pagination = _.get(response, 'pagination');
              this.discussionList = [...this.discussionList, ...upvoted];
              this.showLoader = false;
            } else {
              this.showLoader = false;
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = [];
            })
          break;
        case 'downvoted':
          this.discussService.fetchDownvoted(scrollIndex).subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              const downvoted = response['posts'].filter(p => (p.isMainPost === true));
              this.discussionList = [...this.discussionList, ...downvoted];
              this.pagination = _.get(response, 'pagination');
              this.showLoader = false;
            } else {
              this.showLoader = false;
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = [];
            })
          break;
        default:
          // this.discussionList = _.uniqBy(this.data.latestPosts, 'tid');
          this.pagination = _.get(this.data, 'pagination');
          this.discussionList = _.get(this.data, 'latestPosts');
          break;
      }
    }
  }

  navigateToDiscussionDetails(discussionData) {
    console.log('discussionData', discussionData);
    const slug = _.get(discussionData, 'slug') || _.get(discussionData, 'topic.slug')
    this.router.navigate([`${this.configService.getRouterSlug()}${CONSTANTS.ROUTES.TOPIC}${slug}`]);
  }

  logTelemetry(event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.MY_DISCUSSION);
  }

  /**
   * @description - getting the recent post data
   * @param  {number} scrollIndex
   */
  getRecentTopics(scrollIndex: number) {
    const userId = this.discussService.userId;
    const userSlug = this.discussService.userDetails.userslug;
    combineLatest([
      this.discussService.fetchUserProfile(userId),
      this.discussService.fetchRecentPost(userSlug, scrollIndex)
    ]).subscribe(result => {
      this.showLoader = false;
      this.data = _.merge(result[0], result[1]);
      this.discussionList = [...this.discussionList, ...(_.get(this.data, 'posts'))];
      this.pagination = _.get(this.data, 'pagination');
    }, error => {
      this.showLoader = false;
      console.log(error);
    });
  }
  
  /**
   * @description - call the topic get api when scrolled down and setting the limit of API Call
   */
  onModalScrollDown() {
    if (this.pagination.currentPage !== this.pagination.pageCount) {
        this.pagination.currentPage = this.pagination.next.page;
        const resetpagination = false;
        // using settimeout to avoid the function call before getting the pagination response from api, 
        // because the api is called twice with the same page index
        setTimeout(() => {
          this.filter(this.currentFilter, resetpagination)
        }, 800); 
    }
  }
}
