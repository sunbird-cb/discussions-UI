import { Component, OnInit } from '@angular/core';
import * as Constants from '../../common/constants.json';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.css']
})
export class DiscussHomeComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  topics: any = (Constants as any).default.topics;

  ngOnInit() {
  }

  navigateToDiscussionDetails(topicId) {
    this.router.navigate([`/discussion/home/${topicId}`]);
  }
}
