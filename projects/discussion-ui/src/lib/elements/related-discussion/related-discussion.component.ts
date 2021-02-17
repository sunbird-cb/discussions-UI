import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from './../../common/constants.json';

@Component({
  selector: 'lib-related-discussion',
  templateUrl: './related-discussion.component.html',
  styleUrls: ['./related-discussion.component.scss'],
  host: { class: 'margin-left-l' },
})
export class RelatedDiscussionComponent implements OnInit {
  @Input()
  relatedDiscussions!: []

  constructor(private router: Router,
    private configService: ConfigService
    ) { }

  ngOnInit() {
  }

  getDiscussion(discuss) {
    this.router.navigate([`${this.configService.getConfig().routerSlug}${CONSTANTS.ROUTES.DISCUSSION}topic/${discuss.slug}`]);
  }

}
