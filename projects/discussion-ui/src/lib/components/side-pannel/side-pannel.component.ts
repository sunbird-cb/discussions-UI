import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscussionEventsService } from './../../discussion-events.service';
@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent implements OnInit {

  constructor(
    public router: Router,
    private discussionEvents: DiscussionEventsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const impressionEvent = {
    eid: 'IMPRESSION',
    edata: {
      type: 'view',
      pageid: 'discussion-home',
      uri: this.router.url
    }
    }
    this.discussionEvents.emitTelemetry(impressionEvent);
  }

  navigate(pageName: string) {
    const interactEvent = {
      edata: {
          id: pageName ,
          type: 'CLICK',
          pageid:  'discussion-home'
      }   
  }
    this.discussionEvents.emitTelemetry(interactEvent);
    this.router.navigate([`/discussion/${pageName}`]);
  }

}
