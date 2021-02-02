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

  queryParams: any;
  hideSidePanel: boolean;

  selectedTab: string;
  showSideMenu: Boolean = true;
  data = {
    "enabled": [
      {
        "iconClass": "fa-list",
        "route": "categories",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.categories&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.categories&rsqb;&rsqb;",
        "enabled": "true",
        "properties": {

        },
        "order": "0",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 0,
        "selected": true
      },
      {
        "iconClass": "fa-inbox",
        "route": "unread",
        "class": "",
        "id": "unread-count",
        "text": "&lsqb;&lsqb;global:header.unread&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.unread&rsqb;&rsqb;",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": true
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "enabled": "true",
        "properties": {

        },
        "order": "1",
        "index": 1,
        "selected": false
      },
      {
        "iconClass": "fa-clock-o",
        "route": "recent",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.recent&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.recent&rsqb;&rsqb;",
        "enabled": "",
        "properties": {

        },
        "order": "2",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 2,
        "selected": false
      },
      {
        "iconClass": "fa-tags",
        "route": "tags",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.tags&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.tags&rsqb;&rsqb;",
        "enabled": "on",
        "properties": {

        },
        "order": "3",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 3,
        "selected": false
      },
      {
        "iconClass": "fa-fire",
        "route": "popular",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.popular&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.popular&rsqb;&rsqb;",
        "enabled": "",
        "properties": {

        },
        "order": "4",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 4,
        "selected": false
      },
      {
        "iconClass": "fa-user",
        "route": "users",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.users&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.users&rsqb;&rsqb;",
        "enabled": "true",
        "properties": {

        },
        "order": "5",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 5,
        "selected": false
      },
      {
        "iconClass": "fa-group",
        "route": "groups",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.groups&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.groups&rsqb;&rsqb;",
        "enabled": "true",
        "properties": {

        },
        "order": "6",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": false
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "index": 6,
        "selected": false
      },
      {
        "iconClass": "fa-cogs",
        "route": "admin",
        "class": "",
        "id": "",
        "text": "&lsqb;&lsqb;global:header.admin&rsqb;&rsqb;",
        "textClass": "visible-xs-inline",
        "title": "&lsqb;&lsqb;global:header.admin&rsqb;&rsqb;",
        "groups": [
          {
            "displayName": "Global Moderators",
            "selected": false
          },
          {
            "displayName": "administrators",
            "selected": true
          },
          {
            "displayName": "unverified-users",
            "selected": false
          },
          {
            "displayName": "verified-users",
            "selected": false
          },
          {
            "displayName": "registered-users",
            "selected": false
          },
          {
            "displayName": "guests",
            "selected": false
          },
          {
            "displayName": "spiders",
            "selected": false
          },
          {
            "displayName": "Category Owner",
            "selected": false
          }
        ],
        "enabled": "true",
        "properties": {

        },
        "order": "7",
        "index": 7,
        "selected": false
      }
    ]
  }

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
    this.paramsSubscription = this.activatedRoute.queryParams.pipe(first()).subscribe((params) => {
      console.log('params', params);
      this.queryParams = params;
      this.discussService.userName = _.get(params, 'userName');
      const rawCategories = JSON.parse(_.get(params, 'categories'));
      this.discussService.forumIds = _.get(rawCategories, 'result');
    });
    localStorage.setItem('userName', _.get(this.queryParams, 'userName'));
    this.discussService.initializeUserDetails(localStorage.getItem('userName'));
    for (let i = 0; i < this.data.enabled.length; i++) {
      let item = this.data.enabled
      if (item[i].enabled === '') {
        this.data.enabled.splice(i, 1)
      }
    }
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
    this.router.navigate([`${CONSTANTS.ROUTES.DISCUSSION}${pageName}`], { queryParams: this.queryParams });
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
