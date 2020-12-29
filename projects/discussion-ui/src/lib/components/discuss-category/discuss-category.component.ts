import { Component, Input, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TelemetryUtilsService } from './../../telemetry-utils.service';

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */

@Component({
  selector: 'lib-discuss-category',
  templateUrl: './discuss-category.component.html',
  styleUrls: ['./discuss-category.component.css']
})
export class DiscussCategoryComponent implements OnInit {

  categories: NSDiscussData.ICategorie[] = [];

  @Input() categoryIds = ['1', '2', '6'];

  pageId = 0;

  isTopicCreator = false;

  showStartDiscussionModal = false;

  categoryId: any;

  constructor(
    public discussService: DiscussionService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private telemetryUtils: TelemetryUtilsService
    ) { }

  ngOnInit() {
    this.telemetryUtils.setContext([]);
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.CATEGORY);
    this.fetchAllAvailableCategories(this.categoryIds);
  }

  fetchAllAvailableCategories(ids) {
    ids.forEach(cid => {
      this.fetchCategory(cid).subscribe(data => {
        this.categories.push(data);
      }, error => {
        // TODO: Toast error
        console.log('issue fetching category', error);
      });
    });
  }

  fetchCategory(cid) {
    return this.discussService.fetchSingleCategoryDetails(cid);
  }

  navigateToDiscussionPage(data) {
    if (!_.isEmpty(_.get(data, 'parent'))) {
      this.telemetryUtils.uppendContext({id: _.get(data, 'cid'), type: 'Sub-Category'});
    } else {
      this.telemetryUtils.uppendContext({id: _.get(data, 'cid'), type: 'Category'});
    }
    this.fetchCategory(_.get(data, 'cid')).subscribe(response => {
      this.categoryId  = _.get(response, 'cid') ;
      this.isTopicCreator = _.get(response, 'privileges.topics:create') === true ? true : false;
      this.showStartDiscussionModal = false;
      if (_.get(response, 'children').length > 0) {
        this.router.navigate([], { relativeTo: this.activatedRoute.parent });
        this.categories = [];
        _.get(response, 'children').forEach(subCategoryData => {
          this.categories.push(subCategoryData);
        });
      } else {
        this.router.navigate([`/discussion/category/`, `${_.get(data, 'slug')}`]);
      }
    }, error => {
      // TODO: Toast error
      console.log('issue fetching category', error);
    });
  }

  startDiscussion() {
    this.showStartDiscussionModal = true;
  }

  closeModal(event) {
    console.log('event', event);
    this.showStartDiscussionModal = false;
  }

  logTelemetry(event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.CATEGORY);
  }
}
