import { CONTEXT_PROPS } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import * as CONSTANTS from './../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { NSDiscussData } from '../../models/discuss.model';
import { DiscussStartComponent } from '../discuss-start/discuss-start.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

/* tslint:enable */

@Component({
  selector: 'lib-discuss-all',
  templateUrl: './discuss-all.component.html',
  styleUrls: ['./discuss-all.component.scss']
})
export class DiscussAllComponent implements OnInit {

  discussionList = [];
  routeParams: any;
  showStartDiscussionModal = false;
  categoryId: string;
  isTopicCreator = false;
  showLoader = false;
  currentFilter = 'recent'
  currentActivePage: any;
  fetchNewData: false;
  bsModalRef: BsModalRef;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService, private modalService: BsModalService,
    private telemetryUtils: TelemetryUtilsService) { }

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);

    this.route.params.subscribe(x => {
      console.log('-------------xxxxxxxxxx------------')
      this.currentActivePage = x.page || 1
      this.refreshData(this.currentActivePage)
    })
  }

  navigateToDiscussionDetails(discussionData) {
    console.log('discussionData', discussionData);

    const matchedTopic = _.find(this.telemetryUtils.getContext(), { type: 'Topic' });
    if (matchedTopic) {
      this.telemetryUtils.deleteContext(matchedTopic);
    }

    this.telemetryUtils.uppendContext({
      id: _.get(discussionData, 'tid'),
      type: 'Topic'
    });
    this.router.navigate([`${CONSTANTS.ROUTES.TOPIC}${_.trim(_.get(discussionData, 'slug'))}`]);
  }

  getDiscussionList(slug: string) {
    this.showLoader = true;
    console.log('---------slug-----------', slug)
    this.discussionService.getContextBasedTopic(slug).subscribe(data => {
      this.showLoader = false;
      this.isTopicCreator = _.get(data, 'privileges.topics:create') === true ? true : false;
      this.discussionList = _.union(_.get(data, 'topics'), _.get(data, 'children'));
      console.log('this.discussionList', this.discussionList);
    }, error => {
      this.showLoader = false;
      // TODO: Toaster
      console.log('error fetching topic list', error);
    });
  }

  filter(key: string | 'recent' | 'popular') {
    if (key) {
      this.currentFilter = key;
      switch (key) {
        case 'recent':
          this.fillrecent(this.currentActivePage)
          break;
        case 'popular':
          this.fillPopular(this.currentActivePage)
          break;
        default:
          break;
      }
    }
  }

  fillrecent(_page: any) {
    this.getRecentData(this.currentActivePage)
  }

  fillPopular(page: any) {
    return this.discussionService.fetchPopularD(page).subscribe((response: any) => {
      // this.paginationData = response.pagination
      // this.setPagination()
      this.discussionList = _.get(response, 'topics')
    })
  }

  refreshData(page: any) {
    // if (this.fetchNewData) {
    if (this.currentFilter === 'recent') {
      this.getRecentData(page)
    } else {
      this.fillPopular(page)
    }
    // }
  }

  getRecentData(page: any) {
    return this.discussionService.fetchRecentD(page).subscribe(
      (data: any) => {
        // this.paginationData = data.pagination
        // this.setPagination()
        this.discussionList = _.get(data, 'topics')
      })
  }

    startDiscussion() {
      // this.showStartDiscussionModal = true;
      this.bsModalRef = this.modalService.show(DiscussStartComponent);

      this.bsModalRef.content.onClose().subscribe(
        console.log('completed')
      );
    }

  // startDiscussion() {
  //   const dialogRef = this.dialog.open(DiscussStartComponent, {
  //     minHeight: 'auto',
  //     width: '80%',
  //     panelClass: 'remove-pad',
  //   })
  //   dialogRef.afterClosed().subscribe((response: any) => {
  //     if (response === 'postCreated') {
  //       console.log('------- discussion created success -------------')
  //     }
  //   })
  // }

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
