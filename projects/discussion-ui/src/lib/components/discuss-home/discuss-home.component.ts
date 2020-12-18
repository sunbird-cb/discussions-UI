import { Component, OnInit } from '@angular/core';
import * as Constants from '../../common/constants.json';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';

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
    private discussionService: DiscussionService
  ) { }

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
}
