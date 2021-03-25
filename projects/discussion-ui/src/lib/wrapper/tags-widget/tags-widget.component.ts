import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events.service';
import { NavigationServiceService } from '../../navigation-service.service';
import { ConfigService } from '../../services/config.service';
import { DiscussionService } from '../../services/discussion.service';
import { BaseWrapperComponent } from '../base-wrapper/base-wrapper.component';

@Component({
  selector: 'sb-tags-widget',
  templateUrl: './tags-widget.component.html',
  styleUrls: ['./tags-widget.component.css']
})
export class TagsWidgetComponent extends BaseWrapperComponent  {

  constructor(private configSvc: ConfigService, private discussionService: DiscussionService,  navigationServiceService: NavigationServiceService,  eventService: EventsService) {
    super(navigationServiceService, eventService)
  }

  ngOnInit() {
  }

}
