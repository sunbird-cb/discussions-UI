import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router, ActivatedRoute } from '@angular/router';


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

  constructor(
    public discussService: DiscussionService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.fetchAvailableCategories(this.categoryIds);
  }

  fetchAvailableCategories(ids) {
    ids.forEach(cid => {
      this.discussService.fetchSingleCategoryDetails(cid).subscribe(data => {
        this.categories.push(data);
      }, error => {
        console.log(error);
      });
    });
  }

  navigateToDiscussionPage(data) {
    let id  = 0;
    if (_.get(data, 'children').length > 0) {
      this.router.navigate([], { relativeTo: this.activatedRoute.parent, queryParams: { id: id++ } });
      this.categories = [];
      _.get(data, 'children').forEach(subCategoryData => {
        this.categories.push(subCategoryData);
      });
    } else {
    console.log('clicked', data);
    this.router.navigate([`/discussion/category/`, `${_.get(data, 'slug')}`]);
    }
  }
}
