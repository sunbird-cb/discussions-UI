import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* tslint:disable */
import * as _ from 'lodash'
import { IdiscussionConfig } from '../../models/discussion-config.model';
import { ConfigService } from '../../services/config.service';
import { OnDestroy } from '@angular/core';
/* tslint:enable */
@Component({
  selector: 'lib-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit, OnDestroy {

  data: IdiscussionConfig;
  config: any;
  pageKey: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    private location: Location
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageKey = _.get(params, 'page')
      this.config = localStorage.getItem(_.get(params, 'page'))
      this.configService.setConfig(JSON.parse(this.config))

      this.data = this.configService.getConfig();
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
