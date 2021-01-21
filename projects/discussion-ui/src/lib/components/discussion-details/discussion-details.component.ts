import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NSDiscussData } from './../../models/discuss.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CONSTANTS from '../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { Subscription } from 'rxjs';
/* tslint:enable */


@Component({
  selector: 'lib-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit, OnDestroy {
  @Input() topicId: any;
  @Input() slug: string;

  routeParams: any;
  currentActivePage = 1;
  currentFilter = 'timestamp'; // 'recent
  data: any;
  paginationData!: any;
  pager = {};
  fetchSingleCategoryLoader = false;
  paramsSubscription: Subscription;
  editMode = false;
  updatedPost = false;
  contentPost: any;
  editContentIndex: any;
  mainUid: number;

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private formBuilder: FormBuilder,
    public router: Router,
    private telemetryUtils: TelemetryUtilsService,
  ) { }

  ngOnInit() {
    if (!this.topicId && !this.slug) {
      this.route.params.subscribe(params => {
        this.routeParams = params;
        console.log('discuss params', params);
        this.slug = _.get(this.routeParams, 'slug');
        this.topicId = _.get(this.routeParams, 'topicId');
        this.refreshPostData(this.currentActivePage);
      });
    } else {
      this.refreshPostData(this.currentActivePage);
    }

    this.paramsSubscription = this.route.queryParams.subscribe(x => {
      if (x.page) {
        this.currentActivePage = x.page || 1;
        this.refreshPostData(this.currentActivePage);
      }
    });
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.DETAILS);
  }


  refreshPostData(page: any) {
    if (this.currentFilter === 'timestamp') {
      console.log('from component refreshPostData method', this.slug);
      this.discussionService.fetchTopicById(this.topicId, this.slug, page).subscribe(
        (data: NSDiscussData.IDiscussionData) => {
          this.data = data;
          this.paginationData = _.get(data, 'pagination');
          this.mainUid = _.get(data, 'loggedInUser.uid');
          // this.setPagination();
        },
        (err: any) => {
          // toast message
         // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
        });
    } else {
      console.log('from component refreshPostData method else', this.slug);
      this.discussionService.fetchTopicByIdSort(this.topicId, 'voted', page).subscribe(
        (data: NSDiscussData.IDiscussionData) => {
          this.data = data;
          this.paginationData = _.get(data, 'pagination');
          this.mainUid = _.get(data, 'loggedInUser.uid');
          // this.setPagination();
        },
        (err: any) => {
          // toast message
          // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
        });
    }
  }

  setPagination() {
    this.pager = {
      startIndex: this.paginationData.first.page,
      endIndex: this.paginationData.last.page,
      pages: this.paginationData.pages,
      currentPage: this.paginationData.currentPage,
      totalPage: this.paginationData.pageCount,
    };
  }

  upvote(discuss: NSDiscussData.IDiscussionData) {
    const req = {
      delta: 1,
    };
    this.processVote(discuss, req);
  }

  downvote(discuss: NSDiscussData.IDiscussionData) {
    const req = {
      delta: -1,
    };
    this.processVote(discuss, req);
  }

  private async processVote(discuss: any, req: any) {
    if (discuss && discuss.uid) {
      this.discussionService.votePost(discuss.pid, req).subscribe(
        () => {
          // toast
          // this.openSnackbar(this.toastSuccess.nativeElement.value);
          this.refreshPostData(this.currentActivePage);
        },
        (err: any) => {
          // toast
          // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
        });
    }
  }

  bookmark(discuss: any) {
    this.discussionService.bookmarkPost(discuss.pid).subscribe( data => {
        // toast
        // this.openSnackbar('Bookmark added successfully!');
        this.refreshPostData(this.currentActivePage);
      },
      (err: any) => {
        // toast
       // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
      });
  }

  unBookMark(discuss: any) {
    this.discussionService.deleteBookmarkPost(discuss.pid).subscribe( data => {
       // toast
        this.refreshPostData(this.currentActivePage);
      },
      (err: any) => {
        // toast
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
      });
  }

  deleteVote(discuss: any) {
    this.discussionService.deleteVotePost(discuss.pid).subscribe( data => {
      // toast
        this.refreshPostData(this.currentActivePage);
      },
      (err: any) => {
        // toast
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
      });
  }

  postReply(replyContent: string, post: NSDiscussData.IDiscussionData) {
    const req = {
      content: replyContent,
    };
    if (post && post.tid) {
      this.discussionService.replyPost(post.tid, req).subscribe(
        () => {
          // toast
          // this.openSnackbar('Your reply was saved succesfuly!');
          // this.fetchNewData = true;
          this.refreshPostData(this.currentActivePage);
        },
        (err: any) => {
          // toast
          // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
        });
    }
  }

  postCommentsReply(replyContent: string, post: NSDiscussData.IPosts) {
    const req = {
      content: replyContent,
      toPid: post.pid,
    };
    if (post && post.tid) {
      this.discussionService.replyPost(post.tid, req).subscribe(
        () => {
          // toast
          // this.openSnackbar('Your reply was saved succesfuly!');
          this.refreshPostData(this.currentActivePage);
        },
        (err: any) => {
          // toast
          // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
        });
    }
  }

  confirmDelete(pid) {
    if (window.confirm(`Are you sure you want to delete this Post? This can't be undone.`)) {
      this.deletePost(pid);
    }
  }

  filter(key: string | 'timestamp' | 'upvotes') {
    if (key) {
      this.currentFilter = key;
      this.refreshPostData(this.currentActivePage);
    }
  }

  navigateWithPage(page: any) {
    if (page !== this.currentActivePage) {
      this.router.navigate([`${CONSTANTS.ROUTES.CATEGORY} ${this.topicId}`], { queryParams: { page } });
    }
  }

  showError(meta: string) {
    if (meta) {
      return true;
    }
    return false;
  }

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

  logTelemetry(event, data?) {
    const pid = _.get(data, 'pid') || _.get(data, 'mainPid') ?
    {id: _.get(data, 'pid') || _.get(data, 'mainPid'), type: 'Post'} : {};
    this.telemetryUtils.uppendContext(pid);
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.DETAILS);
  }

  onEditMode(UpdatePostStatus: boolean) {
    if (UpdatePostStatus) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  getRealtimePost(post: any, index: any) {
    this.editMode = true;
    this.editContentIndex = index;
    this.contentPost = _.get(post, 'content').replace(/<[^>]*>/g, '');
    post.toggle = false;
  }

  updatePost(updatedPostContent: any, pid: number) {
    this.editMode = false;
    const req = {
      content: updatedPostContent,
      title: '',
      tags : [],
      uid: this.mainUid
      };
    this.discussionService.editPost(pid, req).subscribe((data: any) => {
      // TODO: Success toast
      this.refreshPostData(this.currentActivePage);
    }, (error) => {
      // TODO: error toast
      console.log('e', error);
    });
    console.log(pid);
  }

  deletePost(postId: number) {
    this.discussionService.deletePost(postId, this.mainUid).subscribe((data: any) => {
      // TODO: Success toast
      this.refreshPostData(this.currentActivePage);
    }, (error) => {
      // TODO: error toast
      console.log('e', error);
    });
  }

  editReplyHandler(event, post) {
    if (_.get(event, 'action') === 'cancel') {
      this.onEditMode(false);
    } else if (_.get(event, 'action') === 'edit') {
      this.updatePost(_.get(event, 'content'), _.get(post, 'pid'));
      this.logTelemetry(event, post);
    }
  }

  commentReplyHandler(event, post) {
    if (_.get(event, 'action') === 'cancel') {
      this.togglePost(post);
    } else if (_.get(event, 'action') === 'reply') {
      this.postCommentsReply(_.get(event, 'content'), post);
      this.logTelemetry(event, post);
    }
  }

  postReplyHandler(event, post) {
    if (_.get(event, 'action') === 'reply') {
      this.postReply(_.get(event, 'content'), post);
      this.logTelemetry(event, post);
    }
  }

  togglePost(post) {
    post.toggle = !post.toggle;
    this.onEditMode(false);
  }
  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

}
