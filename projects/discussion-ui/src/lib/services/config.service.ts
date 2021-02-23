import { DiscussionService } from './discussion.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash'
import { IdiscussionConfig } from '../models/discussion-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  paramsSubscription: Subscription;
  private _config: IdiscussionConfig;
  public checkContext: boolean;
  public queryParams;


  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
  ) { }

  ngOnInit() {

  }

  setConfig(activatedRoute) {
    activatedRoute.data.subscribe((config) => {
      this._config = config.data;
    });
  }

  setConfigFromParams(activatedRoute) {
    activatedRoute.queryParams.subscribe((params) => {
      const obj: IdiscussionConfig = {
        userName : _.get(params, 'userName'),
        categories : JSON.parse(_.get(params, 'categories'))
      };
      this._config = obj;
    });
  }

  public getConfig() {
    return this._config;
  }




  // if (_.get(this._config, 'cid')) {
  //   // this.checkContext = true
  // } else {
  //   // this.checkContext = false;
  // }
}
