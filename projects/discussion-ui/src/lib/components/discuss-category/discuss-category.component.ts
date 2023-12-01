import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'


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

  categoryIds = ['1', '2', '6', '16'];

  pageId = 0;

  isTopicCreator = false;

  showStartDiscussionModal = false;

  categoryId: any;

  constructor(
    public discussService: DiscussionService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService,) { }

  ngOnInit() {
    /** It will look for the queryParams, if back button is clicked,
     * the queryParams will change and it will fetch the categories
     * if there is no queryParams available, then it will fetch the default categories of the forumIds
     */
    this.activatedRoute.queryParams.subscribe((params) => {
      if ( _.get(params, 'cid')) {
        this.navigateToDiscussionPage(_.get(params, 'cid'));
      } else {
        this.categories = [];
        this.fetchAllAvailableCategories(this.categoryIds);
      }
    });

    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en')
      let lang = localStorage.getItem('websiteLanguage')!
     
      this.translate.use(lang)
      console.log('current lang ------', this.translate.getBrowserLang())
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log('onLangChange', event);
      });
    }
  }

  translateHub(hubName: string): string {
    const translationKey =  hubName;
    return this.translate.instant(translationKey);
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

  /**
   * It will fetch the children for each category click.
   * if there is no children available the it will redirect to the topic list page
   */
  navigateToDiscussionPage(cid, slug?) {
    this.fetchCategory(cid).subscribe(response => {
      this.categoryId  = _.get(response, 'cid') ;
      this.isTopicCreator = _.get(response, 'privileges.topics:create') === true ? true : false;
      this.showStartDiscussionModal = false;
      if (_.get(response, 'children').length > 0) {
        this.router.navigate([], { relativeTo: this.activatedRoute.parent, queryParams: { cid: this.categoryId }});
        this.categories = [];
        _.get(response, 'children').forEach(subCategoryData => {
          this.categories.push(subCategoryData);
        });
      } else {
        this.router.navigate([`/discussion/category/`, `${slug}`]);
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
}
