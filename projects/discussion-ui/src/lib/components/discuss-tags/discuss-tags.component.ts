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
import { DiscussUtilsService } from '../../services/discuss-utils.service';
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
    private telemetryUtils: TelemetryUtilsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private discussUtils: DiscussUtilsService
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
    const bgColor = this.discussUtils.stringToColor(tagTitle.toLowerCase());
    const color = this.discussUtils.getContrast();
    return { color, 'background-color': bgColor };
  }

  getAllDiscussions(tag: { value: any }) {
    this.queryParam = tag.value
    const tagdata = {
      tagname: ''
    }
    tagdata.tagname = tag.value
    this.queryParam = tagdata

    let routerSlug = this.configService.getConfig().routerSlug ? this.configService.getConfig().routerSlug : ''
    this.router.navigate([`${routerSlug}${CONSTANTS.ROUTES.TAG}tag-discussions`], { queryParams: this.queryParam });
  }

}
