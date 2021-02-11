import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  paramsSubscription: Subscription;
  private _config: any;
  public checkContext: boolean


  constructor(
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

  }

  setConfig(value) {
    if (!this._config) {
      this.paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
        console.log('params---------------------------', params)
        this._config = params;
      })
    } else {
      this._config = value;
    }
  }

  public getConfig() {
    if (!this._config) {
      this.paramsSubscription = this.activatedRoute.queryParams.subscribe((params) => {
        console.log('params---------------------------', params)
        this.setConfig(params)
      })
    } else {
      return this._config;
    }
  }




  // if (_.get(this._config, 'cid')) {
  //   // this.checkContext = true
  // } else {
  //   // this.checkContext = false;
  // }
}
