import { DiscussionEventsService } from './../../discussion-events.service';
import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */

@Component({
  selector: 'lib-my-discussion',
  templateUrl: './my-discussion.component.html',
  styleUrls: ['./my-discussion.component.css']
})
export class MyDiscussionComponent implements OnInit {

  data; // this is for user
  discussionList; // this is for posts
  currentFilter = 'timestamp';
  department!: string | null;
  location!: string | null;
  profilePhoto!: string;

  constructor(
    private route: ActivatedRoute,
    private discussService: DiscussionService,
    public router: Router,
    private discussionEvents: DiscussionEventsService) {
    this.fetchNetworkProfile();
  }
  fetchNetworkProfile() {
    this.discussService.fetchNetworkProfile().subscribe(response => {
      console.log(response);
      this.data = response;
      this.discussionList = this.data.posts.filter(p => (p.isMainPost === true));
      console.log('>>>>>>>', this.discussionList);
      // if (this.configSvc.userProfile) {
      //   localStorage.setItem(this.configSvc.userProfile.userId, this.profilePhoto);
      // }
    },
      /* tslint:disable */
      () => {
        this.profilePhoto = ''
      })
    /* tslint:enable */
  }

  ngOnInit() {
    // this.fillDummyData()
    // this.data = this.route.snapshot.data.profile.data;
    // this.discussionList = _.uniqBy(_.filter(this.data.posts, p => _.get(p, 'isMainPost') === true), 'tid');
    const impressionEvent = {
      eid: 'IMPRESSION',
      edata: {
        type: 'view',
        pageid: 'my-discussion',
        uri: this.router.url
      },
      context: []
      }
    this.discussionEvents.emitTelemetry(impressionEvent);
    this.department = this.discussService.getUserProfile.departmentName || null;
    this.location = this.discussService.getUserProfile.country || null;
  }
  filter(key: string | 'timestamp' | 'best' | 'saved' | 'watched' | 'upvoted' | 'downvoted') {
    if (key) {
      this.currentFilter = key;
      this.addTelemetry(`${key + 'posts'}`);
      switch (key) {
        case 'timestamp':
          // this.discussionList = _.uniqBy(_.filter(this.data.posts, p => _.get(p, 'isMainPost') === true), 'tid');
          this.discussionList = this.data.posts.filter(p => (p.isMainPost === true));
          break;
        case 'best':
          // this.discussionList = _.uniqBy(this.data.bestPosts, 'tid');
          this.discussionList = this.data.bestPosts;
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
            () => {
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
              this.discussionList = response['posts'];
            } else {
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = [];
            });

          break;
        case 'downvoted':
          this.discussService.fetchDownvoted().subscribe(response => {
            if (response) {
              // this.discussionList = _.uniqBy(response['posts'], 'tid');
              this.discussionList = response['posts'];
            } else {
              this.discussionList = [];
            }
          },
            // tslint:disable-next-line
            () => {
              this.discussionList = [];
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
    this.addTelemetry('discuss-card');
    this.router.navigate([`/discussion/category/${_.get(discussionData, 'topic.slug')}`]);
  }

  addTelemetry(id) {
    const eventData = {
      eid: 'INTERACT',
      edata: {
          id: id ,
          type: 'CLICK',
          pageid: 'my-discussion'
      }
    }
    this.discussionEvents.emitTelemetry(eventData);
  }

}
