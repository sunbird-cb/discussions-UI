import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavigationServiceService } from '../../navigation-service.service';
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from './../../common/constants.json';

@Component({
  selector: 'sb-related-discussion',
  templateUrl: './related-discussion.component.html',
  styleUrls: ['./related-discussion.component.scss'],
  host: { class: 'margin-left-l' },
})
export class RelatedDiscussionComponent implements OnInit {
  @Input()
  relatedDiscussions!: []

  constructor(private router: Router,
    private configService: ConfigService,
    private navigationService: NavigationServiceService
  ) { }

  ngOnInit() {
  }

  getDiscussion(discuss) {
    debugger
    let routerSlug = this.configService.getConfig().routerSlug ? this.configService.getConfig().routerSlug : ''
    let input = {data:{url:`${routerSlug}${CONSTANTS.ROUTES.DISCUSSION}topic/${discuss.slug}`, queryParams:{}, tid: discuss.tid, title: discuss.title}, action: CONSTANTS.CATEGORY_DETAILS}
    this.navigationService.navigate(input)
    // this.router.navigate([`${routerSlug}${CONSTANTS.ROUTES.DISCUSSION}topic/${discuss.slug}`]);
  }

}
