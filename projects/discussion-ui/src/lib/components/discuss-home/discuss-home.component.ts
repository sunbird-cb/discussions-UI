import { Component, OnInit } from '@angular/core';
import * as Constants from '../../common/constants.json';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */

@Component({
  selector: 'lib-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.css']
})
export class DiscussHomeComponent implements OnInit {

  discussionList = [];
  routeParams: any;
  showStartDiscussionModal = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    private translate: TranslateService,
  ) { 
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeParams = params;
      this.getDiscussionList(_.get(this.routeParams, 'slug'));
    });
  }

  navigateToDiscussionDetails(discussionData) {
    console.log('discussionData', discussionData);
    this.router.navigate([`/discussion/category/${_.get(discussionData, 'slug')}`]);
  }

  getDiscussionList(slug: string) {
    this.discussionService.getContextBasedTopic(slug).subscribe(data => {
    this.discussionList = _.union(_.get(data, 'topics'), _.get(data, 'children'));
    console.log('this.discussionList', this.discussionList);
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
