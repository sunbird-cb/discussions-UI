import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NSDiscussData } from './../../models/discuss.model';
import { FormGroup, FormBuilder } from '@angular/forms';
/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */


@Component({
  selector: 'lib-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit {
  topicId: any;
  routeParams: any;
  currentActivePage = 1;
  currentFilter = 'timestamp'; // 'recent
  data: any;
  paginationData!: any;
  pager = {};
  slug: string;
  postAnswerForm!: FormGroup;
  replyForm: FormGroup;
  fetchSingleCategoryLoader = false;

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.initializeFormFiled();
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.slug = _.get(this.routeParams, 'slug');
      this.topicId = _.get(this.routeParams, 'topicId');
      this.refreshPostData(this.currentActivePage);
    });

    this.route.queryParams.subscribe(x => {
      if (x.page) {
        this.currentActivePage = x.page || 1;
        this.refreshPostData(this.currentActivePage);
      }
    });
  }
  initializeFormFiled() {
    this.postAnswerForm = this.formBuilder.group({
      answer: [],
    });

    this.replyForm = this.formBuilder.group({
      reply: []
    });
  }

  refreshPostData(page: any) {
    if (this.currentFilter === 'timestamp') {
      console.log('from component refreshPostData method', this.slug);
      this.discussionService.fetchTopicById(this.topicId, this.slug, page).subscribe(
        (data: NSDiscussData.IDiscussionData) => {
          this.data = data;
          this.paginationData = data.pagination;
          this.setPagination();
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
          this.paginationData = data.pagination;
          this.setPagination();
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
          this.postAnswerForm.reset();
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

  delteVote(discuss: any) {
    this.discussionService.deleteVotePost(discuss.pid).subscribe( data => {
      // toast
        this.refreshPostData(this.currentActivePage);
      },
      (err: any) => {
        // toast
        // this.openSnackbar(err.error.message.split('|')[1] || this.defaultError);
      });
  }

  postReply(post: NSDiscussData.IDiscussionData) {
    const req = {
      // tslint:disable-next-line:no-string-literal
      content: this.postAnswerForm.controls['answer'].value,
    };
    // tslint:disable-next-line:no-string-literal
    this.postAnswerForm.controls['answer'].setValue('');
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

  postCommentsReply(post: NSDiscussData.IPosts) {
    console.log('<><><><><>', post);
    const req = {
      // tslint:disable-next-line:no-string-literal
      content: this.replyForm.controls['reply'].value,
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

  filter(key: string | 'timestamp' | 'upvotes') {
    if (key) {
      this.currentFilter = key;
      this.refreshPostData(this.currentActivePage);
    }
  }

  navigateWithPage(page: any) {
    if (page !== this.currentActivePage) {
      this.router.navigate([`/discussion/category/${this.topicId}`], { queryParams: { page } });
    }
  }

  showError(meta: string) {
    if (meta) {
      return true;
    }
    return false;
  }

}
