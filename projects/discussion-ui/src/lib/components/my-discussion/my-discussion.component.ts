import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
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

  data; // this is for user
  discussionList; // this is for posts
  currentFilter = 'timestamp';
  department!: string | null;
  location!: string | null;
  profilePhoto!: string;
  userInitial = '';
  showLoader = false;
  constructor(
    private discussService: DiscussionService,
    private configService: ConfigService,
    public router: Router,
    private telemetryUtils: TelemetryUtilsService) { }

  /** To fetch user details */
  fetchUserProfile(userName) {
    this.showLoader = true;
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
      // error code check
      this.discussService.showTrafficAlert(error);
      // TODO: Toaster
      console.log('error fetching user details');
    });
  }

  ngOnInit() {
    this.showLoader = true;
    this.telemetryUtils.setContext([]);
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.MY_DISCUSSION);
    const userId = this.discussService.userId;
    combineLatest([
      this.discussService.fetchUserProfile(userId),
      this.discussService.fetchRecentPost()
    ]).subscribe(result => {
      this.showLoader = false;
      this.data = _.merge(result[0], result[1]);
      this.filter(this.currentFilter);
    }, error => {
      this.showLoader = false;
      console.log(error);
    });
  }

  filter(key: string | 'timestamp' | 'best' | 'saved' | 'watched' | 'upvoted' | 'downvoted') {
    if (key) {
      this.currentFilter = key;
      switch (key) {
        case 'timestamp':
          // this.discussionList = _.uniqBy(_.filter(this.data.posts, p => _.get(p, 'isMainPost') === true), 'tid');
          // this.discussionList = _.get(this.data, 'posts');
          this.discussionList = this.data.posts.filter(p => (p.isMainPost === true));
          break;
        case 'best':
          // this.discussionList = _.uniqBy(this.data.bestPosts, 'tid');
          this.discussService.fetchBestPost().subscribe(result => {
            if (result && result.posts) {
              this.discussionList = result['posts'].filter(p => (p.isMainPost === true));
            } else {
              this.discussionList = [];
            }
          }, error => {
            // error code check
            this.discussService.showTrafficAlert(error);
          });
          break;
        case 'saved':
          this.discussService.fetchSaved().subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              this.discussionList = response['posts'];
            } else {
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            (error) => {
              // error code check
              this.discussService.showTrafficAlert(error);
              this.discussionList = [];
            });
          break;
        case 'watched':
          this.discussionList = [];
          break;
        case 'upvoted':
          this.discussService.fetchUpvoted().subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              this.discussionList = response['posts'].filter(p => (p.isMainPost === true));
            } else {
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            (error) => {
              this.discussionList = [];
              // error code check
              this.discussService.showTrafficAlert(error);
            });

          break;
        case 'downvoted':
          this.discussService.fetchDownvoted().subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              this.discussionList = response['posts'].filter(p => (p.isMainPost === true));
            } else {
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            (error) => {
              this.discussionList = [];
              // error code check
              this.discussService.showTrafficAlert(error);
            });
          break;
        default:
          // this.discussionList = _.uniqBy(this.data.latestPosts, 'tid');
          this.discussionList = this.data.latestPosts;
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

}
