import { DiscussionService } from './discussion.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import * as _ from 'lodash'
import { IdiscussionConfig } from '../models/discussion-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  paramsSubscription: Subscription;
  private _config: IdiscussionConfig;
  public queryParams;
  public checkContext: boolean
  categoryId: string
  changedSubject = new ReplaySubject(1)


  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
  ) { }

  ngOnInit() {

  }

  setConfig(config) {
    // activatedRoute.data.subscribe((config) => {
      this._config = config;
    // });
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

  setCategoryid(id) {
    this.categoryId = id
    this.changedSubject.next(id)
  }

  public getCategoryid() {
    return this.categoryId
  }



  // if (_.get(this._config, 'cid')) {
  //   // this.checkContext = true
  // } else {
  //   // this.checkContext = false;
  // }
}
