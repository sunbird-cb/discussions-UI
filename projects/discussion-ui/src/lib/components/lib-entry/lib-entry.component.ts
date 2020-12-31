import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* tslint:disable */
import * as _ from 'lodash'
/* tslint:enable */
@Component({
  selector: 'lib-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.css']
})
export class LibEntryComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {  }

}
