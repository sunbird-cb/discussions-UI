import { Component, OnInit } from '@angular/core';

/* tslint:disable */
import * as _ from 'lodash'
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from '../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
/* tslint:enable */

@Component({
  selector: 'lib-discuss-tags',
  templateUrl: './discuss-tags.component.html',
  styleUrls: ['./discuss-tags.component.scss']
})
export class DiscussTagsComponent implements OnInit {
  query: string;
  filteredTags: NSDiscussData.ITag[];
  showLoader = false;
  constructor(
    private discussionService: DiscussionService,
    private telemetryUtils: TelemetryUtilsService
  ) { }

  ngOnInit() {
    this.telemetryUtils.setContext([]);
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.TAGS);
    this.fetchAllTags();
  }

  fetchAllTags() {
    this.showLoader = true;
    console.log('in fetchAllTags');
    this.discussionService.fetchAllTag().subscribe(data => {
      this.showLoader = false;
      console.log('data ', data);
      this.filteredTags = _.get(data, 'tags');
    }, error => {
      this.showLoader = false;
      // TODO: toaster
      console.log('error fetching tags');
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
