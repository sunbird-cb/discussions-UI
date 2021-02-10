import { NSDiscussData } from './../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as CONSTANTS from './../../common/constants.json';

/* tslint:disable */
import * as _ from 'lodash'
import { first } from 'rxjs/operators';
import { IMenuOptions, IdiscussionConfig } from '../../models/discussion.model';
/* tslint:enable */

@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.scss']
})
export class SidePannelComponent implements OnInit, OnDestroy {

  @Input() discussionConfig: IdiscussionConfig

  paramsSubscription: Subscription;

  userName: string;

  defaultPage = 'categories';

  queryParams: any;
  hideSidePanel: boolean;
  data: any
  selectedTab: string;
  showSideMenu: Boolean = true;
  menu: any
  // discussionConfig: any
  defaultMenuOPtions: Array<IMenuOptions>
  state: any
  constructor(
    public router: Router,
    public discussService: DiscussionService,
    public activatedRoute: ActivatedRoute,
    private telemetryUtils: TelemetryUtilsService,
  ) {

  }

  ngOnInit() {
    // TODO: loader or spinner

    console.log(this.menu)
    // this.activatedRoute.data.subscribe((data) => {
      debugger
      // this.discussionConfig = data

      console.log('sidepanel config', this.discussService.discussionConfig)
      this.menu = this.discussionConfig.menuOptions
      debugger
      this.hideSidePanel = document.body.classList.contains('widget');
      this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
      this.paramsSubscription = this.activatedRoute.queryParams.pipe(first()).subscribe((params) => {
        console.log('params', params);
        this.queryParams = params;

        this.discussService.userName = this.discussionConfig.userName
        const rawCategories = this.discussionConfig.categories
        this.discussService.forumIds = _.get(rawCategories, 'result');
        localStorage.setItem('userName', this.discussionConfig.userName);
      })
    // });

    this.discussService.initializeUserDetails(localStorage.getItem('userName'));
    // for (let i = 0; i < this.menu.length; i++) {
    //   let item = this.menu
    //   if (!item[i].enable) {
    //     this.menu.splice(i, 1)
    //   }
    // }
    if (this.discussService.forumIds) {
      // this.navigate(this.defaultPage);
    } else {
      // TODO: Error toast
      console.log('forum ids not found');
    }
  }

  navigate(pageName: string, event?) {
    this.selectedTab = pageName;
    this.telemetryUtils.setContext([]);
    if (event) {
      this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
    }
    this.router.navigate([`/app/discussion-forum/${pageName}`], { queryParams: this.queryParams });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  showMenuButton() {
    this.showSideMenu = this.showSideMenu ? false : true;
  }

  closeNav() {
    this.showSideMenu = this.showSideMenu ? false : true;
  }

}
