import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash-es';
import { DiscussionService } from '../../services/discussion.service';
import { ConfigService } from '../../services/config.service';
import * as CONSTANTS from '../../common/constants.json';
import { NSDiscussData } from '../../models/discuss.model';

@Component({
  selector: 'lib-popular-discussions',
  templateUrl: './popular-discussions.component.html',
  styleUrls: ['./popular-discussions.component.scss'],
  // host: { class: 'margin-left-l' },
})
export class PopularDiscussionsComponent implements OnInit, OnChanges {
  
  @Output() passDiscussData: EventEmitter<any> = new EventEmitter();

  popularDiscussions: any[] = [];
  fetchSingleCategoryLoader = false;
  similarPosts: any;

  constructor(
    // private router: Router,
    // private configService: ConfigService,
      private discussionService: DiscussionService,
  ) { }

  ngOnInit() {
    this.fetchRelatedDiscussionData()
  }

  ngOnChanges() {
    
  }

  fetchRelatedDiscussionData(page?: any) {
    this.fetchSingleCategoryLoader = true;
    return this.discussionService.fetchPopularD(page).subscribe((response: any) => {
      this.fetchSingleCategoryLoader = false;
      _.filter(response.topics, (topic) => {
        if (topic.user.uid !== 0 && topic.cid !== 1) {
          this.popularDiscussions.push(topic);
        }
      });
      // this.discussionList = _.get(response, 'topics')
    }, error => {
      this.fetchSingleCategoryLoader = false;
      // TODO: Toaster
      console.log('error fetching topic list', error);
    });
  }

  getDiscussion(discuss) {
    this.passDiscussData.emit(discuss);
    // this.router.navigate([`${this.configService.getRouterSlug()}${CONSTANTS.ROUTES.DISCUSSION}topic/${discuss.slug}`],
    // { queryParamsHandling: "merge" });
  }


}
