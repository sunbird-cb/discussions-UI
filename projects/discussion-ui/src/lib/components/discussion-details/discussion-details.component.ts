import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'lib-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit {
  queryParams: any;
  topicId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   this.queryParams = params;
    //   this.topicId = this.queryParams.tid;
    // });
  }

}
