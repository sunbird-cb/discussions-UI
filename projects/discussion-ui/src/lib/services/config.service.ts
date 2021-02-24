import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash'
import { IdiscussionConfig } from '../models/discussion-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  paramsSubscription: Subscription;
  private _config: IdiscussionConfig;
  public checkContext: boolean


  constructor(
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

  }

  setConfig(config) {
    // activatedRoute.data.subscribe((config) => {
    this._config = config;
    // })

  }

  setDiscussionConfig(key, config) {
    localStorage.setItem(key, config)
  }

  getDiscussionConfig(key) {
    return localStorage.getItem(key)
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
