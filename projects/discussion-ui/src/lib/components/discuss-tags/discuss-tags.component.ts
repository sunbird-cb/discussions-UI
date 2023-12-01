import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'

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
