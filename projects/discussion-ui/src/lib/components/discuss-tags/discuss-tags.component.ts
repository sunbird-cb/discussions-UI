import { Component, OnInit } from '@angular/core';

/* tslint:disable */
import * as _ from 'lodash'
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from '../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from './../../common/constants.json';
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
  queryParam: any;
  paramsSubscription: Subscription;
  getParams: any;
  cIds: any;
  constructor(
    private discussionService: DiscussionService,
    private telemetryUtils: TelemetryUtilsService, private router: Router,
    public activatedRoute: ActivatedRoute,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.telemetryUtils.setContext([]);
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.TAGS);
    // this.configService.setConfig(this.activatedRoute)
    this.getParams = this.configService.getConfig()
    this.cIds = _.get(this.getParams, 'categories')
    console.log(this.getParams, this.cIds)

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

  getAllDiscussions(tag: { value: any }) {
    this.queryParam = tag.value
    const tagdata = {
      tagname: '',
      categories: '',
    }
    tagdata.categories = JSON.stringify(this.cIds)
    tagdata.tagname = tag.value
    this.queryParam = tagdata
    this.router.navigate([`${CONSTANTS.ROUTES.TAG}tag-discussions`], { queryParams: this.queryParam })
  }

}
