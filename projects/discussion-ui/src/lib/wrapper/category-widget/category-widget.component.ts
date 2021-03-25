import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DiscussionService } from '../../services/discussion.service';
import * as _ from 'lodash'
import { NavigationServiceService } from '../../navigation-service.service';
import * as CONSTANTS from '../../common/constants.json';
import { EventsService } from '../../events.service';
import { BaseWrapperComponent } from '../base-wrapper/base-wrapper.component';
@Component({
  selector: 'sb-category-widget',
  templateUrl: './category-widget.component.html',
  styleUrls: ['./category-widget.component.css']
})
export class CategoryWidgetComponent extends BaseWrapperComponent {

  detailsToggle = true;
  category = CONSTANTS.CATEGORY;
  detailsPage = CONSTANTS.CATEGORY_DETAILS
  homePage = CONSTANTS.CATEGORY_HOME
  tid: number
  slug: string

  constructor( configSvc: ConfigService,  discussionService: DiscussionService,  navigationServiceService: NavigationServiceService,  eventService: EventsService) {
    super(navigationServiceService, eventService, configSvc, discussionService )
  }
  // @Input() config

  wrapperInit() {
    this.state = CONSTANTS.CATEGORY;
    // this.navigationServiceService.initService('wrapperService')
    // this.configSvc.setConfig(this.config)
    // this.discussionService.userName = _.get(this.config, 'userName');
    // const rawCategories = _.get(this.config, 'categories');
    // this.discussionService.forumIds = _.get(rawCategories, 'result');
    // this.discussionService.initializeUserDetails(this.config.userName);
    // this.eventService.toggleMenuItem.subscribe((data) => {
    //   if (data.action === this.detailsPage) {
    //     this.tid = data.data.tid
    //     this.slug = data.data.title
    //   }
    //   this.state = data.action
    // })
  }

  protected wrapperEventListener(data) {
    console.log(data)
    if (data.action === this.detailsPage) {
      this.tid = data.data.tid
      this.slug = data.data.title
    }
  }

}
