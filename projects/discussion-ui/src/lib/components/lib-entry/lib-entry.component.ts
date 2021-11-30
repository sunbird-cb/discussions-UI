import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DiscussionEventsService } from './../../discussion-events.service';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { NSDiscussData } from './../../models/discuss.model';

/* tslint:disable */
import * as _ from 'lodash'
import { IdiscussionConfig } from '../../models/discussion-config.model';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';
/* tslint:enable */
@Component({
  selector: 'lib-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit, OnDestroy {

  data: IdiscussionConfig;
  histtoryStartIndex: number;
  showLoaderAlert = false;
  subscription: Subscription

  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    private location: Location,
    private discussionEventService: DiscussionEventsService,
    private telemetryUtils: TelemetryUtilsService

  ) { }

  ngOnInit() {
    this.histtoryStartIndex = window.history.length-1;
    this.configService.setConfig(this.activatedRoute);
    // this.activatedRoute.data.subscribe((data) => {
    this.data = this.configService.getConfig();
    if (!this.data) {
      // fallback for query params
      this.configService.setConfigFromParams(this.activatedRoute);
      this.data = this.configService.getConfig();
    }
    let userId = _.get(this.data, 'userId');
    userId = userId? userId:window.sessionStorage.getItem('dFUserId');
    this.discussionService.userId = userId;
    window.sessionStorage.setItem('dFUserId', userId);
    const rawCategories = _.get(this.data, 'categories');
    this.discussionService.forumIds = _.get(rawCategories, 'result');
    this.discussionService.initializeUserDetails(this.discussionService.userId);
    this.handleLoaderAlert();
   }

  handleLoaderAlert(){

    this.subscription = this.discussionService.alertEvent.subscribe(() => {
      this.showLoaderAlert = true;
    })
  }

  goBack() {
    const eventAction = {
      action: 'DF_BACK'
    };
    this.discussionEventService.emitTelemetry(eventAction);
    this.location.back();
  }

  close(event) {
    this.showLoaderAlert = false;
    const eventAction = {
      action: 'DF_CLOSE'
    };
    this.discussionEventService.emitTelemetry(eventAction);
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.LIB_ENTRY);
    window.history.go(-(window.history.length - this.histtoryStartIndex ));
  }

  closeLoadAlert(){
    this.showLoaderAlert = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onScrollTopActive(event) {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

}
