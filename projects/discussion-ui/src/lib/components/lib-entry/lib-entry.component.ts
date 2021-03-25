import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* tslint:disable */
import * as _ from 'lodash'
import { IdiscussionConfig } from '../../models/discussion-config.model';
import { ConfigService } from '../../services/config.service';
import { OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { AbstractConfigService } from '../../services/abstract-config.service';
import { NavigationServiceService } from '../../navigation-service.service';
/* tslint:enable */
@Component({
  selector: 'sb-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit {

  data: IdiscussionConfig;
  pageKey: any;
  config: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
    private configSvc: ConfigService,
    private location: Location,
    private navigationServiceService: NavigationServiceService,
    @Inject('configService') protected configService: AbstractConfigService
  ) { }

  ngOnInit() {
    console.log(this.configService.config)
    this.navigationServiceService.initService('routerService')
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageKey = _.get(params, 'page')
      this.config = this.configService.getConfig(_.get(params, 'page'))
      this.configSvc.setConfig(JSON.parse(this.config))

      this.data = this.configSvc.getConfig();
      this.discussionService.userName = _.get(this.data, 'userName');
      const rawCategories = _.get(this.data, 'categories');
      this.discussionService.forumIds = _.get(rawCategories, 'result');
      this.discussionService.initializeUserDetails(this.data.userName);
    });
  }

  ngOnDestroy() {
    localStorage.removeItem(this.pageKey)
  }

  goBack() {
    this.location.back();
  }

}
