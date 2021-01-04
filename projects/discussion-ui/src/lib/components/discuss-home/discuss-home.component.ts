import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from '../../common/constants.json';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
/* tslint:disable */
import * as _ from 'lodash'
import { NSDiscussData } from '../../models/discuss.model';
/* tslint:enable */

@Component({
  selector: 'lib-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.css']
})
export class DiscussHomeComponent implements OnInit {

  discussionList = [];
  routeParams: any;
  showStartDiscussionModal = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private telemetryUtils: TelemetryUtilsService) {}

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    });
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
    this.router.navigate([`${CONSTANTS.ROUTES.CATEGORY} ${_.get(discussionData, 'slug')}`]);
  }

  getDiscussionList(slug: string) {
    this.discussionService.getContextBasedTopic(slug).subscribe(data => {
    this.discussionList = _.union(_.get(data, 'topics'), _.get(data, 'children'));
    console.log('this.discussionList', this.discussionList);
    });
  }

  startDiscussion() {
    this.showStartDiscussionModal = true;
  }

  logTelemetry(event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
  }

  closeModal(event) {
    console.log('event', event);
    this.showStartDiscussionModal = false;
  }
}
