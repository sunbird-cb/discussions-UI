import { Component, Input, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionEventsService } from './../../discussion-events.service';


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

  categoryIds = ['1', '2', '6'];

  pageId = 0;

  isTopicCreator = false;

  showStartDiscussionModal = false;

  constructor(
    public discussService: DiscussionService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private discussionEvents: DiscussionEventsService
    ) { }

  ngOnInit() {
    const impressionEvent = 
    {
      eid: 'IMPRESSION',
      edata: {
        type: 'view',
        pageid: 'discussion-category',
        uri: this.router.url
      }
      }
    this.discussionEvents.emitTelemetry(impressionEvent);
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

    console.log('discuss category', data);
    this.addTelemetry('category-card', [
      {
        id: _.get(data, 'cid') || _.get(data, 'category.cid'),
        type: 'Category'
      }]);
    this.fetchCategory(_.get(data, 'cid')).subscribe(response => {
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
    this.addTelemetry('start-discussion');
    this.showStartDiscussionModal = true;
  }

  addTelemetry(id, context?: Array<{}>) {
    const eventData = {
      eid: 'INTERACT',
      edata: {
          id: id ,
          type: 'CLICK',
          pageid: 'discussion-category'
      },
      context,
    }
    this.discussionEvents.emitTelemetry(eventData);
  }
}
