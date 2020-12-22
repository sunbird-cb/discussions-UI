import { DiscussionEventsService } from './../../discussion-events.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* tslint:disable */
import * as _ from 'lodash'
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from '../../models/discuss.model';
/* tslint:enable */

@Component({
  selector: 'lib-discuss-tags',
  templateUrl: './discuss-tags.component.html',
  styleUrls: ['./discuss-tags.component.css']
})
export class DiscussTagsComponent implements OnInit {

  query: string;
  filteredTags: NSDiscussData.ITag[];

  constructor(
    private discussionService: DiscussionService,
    private router: Router,
    private discussionEvents: DiscussionEventsService
  ) { }

  ngOnInit() {
    const impressionEvent = {
      eid: 'IMPRESSION',
      edata: {
        type: 'view',
        pageid: 'discussion-tags',
        uri: this.router.url
      }
    }
    this.discussionEvents.emitTelemetry(impressionEvent);
    this.fetchAllTags();
  }

  fetchAllTags() {
    this.discussionService.fetchAllTag().subscribe(data => {
      this.filteredTags = _.get(data, 'tags');
    });
  }

  public getBgColor(tagTitle: any) {
    const bgColor = this.stringToColor(tagTitle.toLowerCase());
    const color = this.getContrast();
    return { color, 'background-color': bgColor };
  }

  stringToColor(title) {
    let hash = 0;

    for (let i = 0; i < title.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    // tslint:disable-next-line: prefer-template
    const colour = 'hsl(' + hue + ',100%,30%)';
    return colour;
  }

  getContrast() {
    return 'rgba(255, 255, 255, 80%)';
  }
}
