import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionEventsService } from './../../discussion-events.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent implements OnInit {

  // TODO: to take this as input
  userName = 'admin';
  hideSidePanel: boolean;
  constructor(
    public router: Router,
    public discussService: DiscussionService,
    private discussionEvents: DiscussionEventsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.hideSidePanel = document.body.classList.contains('widget');
    const impressionEvent = {
    eid: 'IMPRESSION',
    edata: {
      type: 'view',
      pageid: 'discussion-home',
      uri: this.router.url
    }
    }
    this.discussionEvents.emitTelemetry(impressionEvent);
  
    this.discussService.userName = this.userName;
    this.fetchUserProfile(this.userName);
  }

  navigate(pageName: string) {
    const interactEvent = {
      eid: 'INTERACT',
      edata: {
          id: pageName ,
          type: 'CLICK',
          pageid:  'discussion-home'
      }   
  }
    this.discussionEvents.emitTelemetry(interactEvent);
    this.router.navigate([`/discussion/${pageName}`]);
  }

  fetchUserProfile(userName) {
    this.discussService.fetchUserProfile(userName).subscribe(response => {
      console.log('user', response);
      this.discussService.userDetails = response;
    }, (error) => {
      // TODO: toaster error
        console.log('error fetching user details');
      });
  }
}
