import { CONTEXT_PROPS } from './../../services/discussion.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { ConfigService } from '../../services/config.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import * as CONSTANTS from './../../common/constants.json';
/* tslint:disable */
import * as _ from 'lodash'
import { NSDiscussData } from '../../models/discuss.model';
import { DiscussStartComponent } from '../discuss-start/discuss-start.component';
import { Subscription } from 'rxjs';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  // modalRef: BsModalRef;
  paramsSubscription: Subscription;
  getParams: any;
  cIds: any;


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    public activatedRoute: ActivatedRoute,
    private telemetryUtils: TelemetryUtilsService,
    // private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);


    this.paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.configService.setConfig(params)
    })

    this.getParams = this.configService.getConfig()
    this.cIds = JSON.parse(_.get(this.getParams, 'categories'))


    if (this.cIds.result.length) {
      this.getContextBasedDiscussion(this.cIds.result)
    } else {
      this.currentActivePage = 1
      this.refreshData(this.currentActivePage)
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
    this.router.navigate([`${CONSTANTS.ROUTES.TOPIC}${_.trim(_.get(discussionData, 'slug'))}`]);
  }

  getDiscussionList(slug: string) {
    this.showLoader = true;
    this.discussionService.getContextBasedTopic(slug).subscribe(data => {
      this.showLoader = false;
      this.isTopicCreator = _.get(data, 'privileges.topics:create') === true ? true : false;
      this.discussionList = _.union(_.get(data, 'topics'), _.get(data, 'children'));
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
          this.fillrecent()
          break;
        case 'popular':
          this.fillPopular()
          break;
        default:
          break;
      }
    }
  }

  fillrecent(_page?: any) {
    this.getRecentData(_page)
  }

  fillPopular(page?: any) {
    return this.discussionService.fetchPopularD(page).subscribe((response: any) => {
      // this.paginationData = response.pagination
      // this.setPagination()
      this.discussionList = _.get(response, 'topics')
    })
  }

  getContextBasedDiscussion(cid: any) {
    this.currentFilter === 'recent' ? this.getContextData(cid) : this.getContextData(cid)
  }

  refreshData(page: any) {
    this.currentFilter === 'recent' ? this.getRecentData(page) : this.fillPopular(page)
  }

  getRecentData(page: any) {
    return this.discussionService.fetchRecentD(page).subscribe(
      (data: any) => {
        // this.paginationData = data.pagination
        // this.setPagination()
        this.discussionList = _.get(data, 'topics')
      })
  }

  getContextData(cid: any) {
    const req = {
      request: {
        cids: cid
      }
    };
    return this.discussionService.getContextBasedDiscussion(req).subscribe(
      (data: any) => {
        this.discussionList = _.get(data, 'topics')
      })
  }

  // startDiscussion(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);

    // this.showStartDiscussionModal = true;
    // this.bsModalRef = this.modalService.show(DiscussStartComponent);

    // this.bsModalRef.content.onClose().subscribe(
    //   console.log('completed')
    // );
  // }

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
