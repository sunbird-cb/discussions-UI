import { NSDiscussData } from './../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as CONSTANTS from './../../common/constants.json';

/* tslint:disable */
import * as _ from 'lodash'
import { first } from 'rxjs/operators';
/* tslint:enable */

@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.scss']
})
export class SidePannelComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;

  userName: string;

  defaultPage = 'categories';

  data: any;
  hideSidePanel: boolean;

  selectedTab: string;
  showSideMenu: Boolean = true;
  menu: any;


  constructor(
    public router: Router,
    public discussService: DiscussionService,
    public activatedRoute: ActivatedRoute,
    private telemetryUtils: TelemetryUtilsService,
  ) { }

  ngOnInit() {
    // TODO: loader or spinner
    this.hideSidePanel = document.body.classList.contains('widget');
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
    this.activatedRoute.data.subscribe((data) => {
      this.data = data;
      this.discussService.userName = _.get(data, 'userName');
      const rawCategories = _.get(data, 'categories');
      this.discussService.forumIds = _.get(rawCategories, 'result');


      localStorage.setItem('userName', _.get(this.data, 'userName'));
      this.discussService.initializeUserDetails(this.discussService.userName);

      this.menu = data.menuOptions.length > 0 ? data.menuOptions : CONSTANTS.MENUOPTIONS
    })
    for (let i = 0; i < this.menu.length; i++) {
      let item = this.menu
      if (!item[i].enable) {
        this.menu.splice(i, 1)
      }
    }
    if (this.discussService.forumIds) {
      // this.navigate(this.defaultPage);
    } else {
      // TODO: Error toast
      console.log('forum ids not found');
    }
  }

  isActive(selectedItem) {
    debugger
    if (this.router.url.indexOf(`/${selectedItem}`) > -1 || this.selectedTab === selectedItem) {
      if(!this.selectedTab){
        this.selectedTab = selectedItem
      }
      return true
    } else if (selectedItem === 'categories' && !this.selectedTab ) {
      return true
    }
    return false
  }

  navigate(pageName: string, event?) {
    this.selectedTab = pageName;
    this.telemetryUtils.setContext([]);
    if (event) {
      this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
    }
    this.router.navigate([`${pageName}`], { relativeTo: this.activatedRoute });
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
