import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent implements OnInit {

  // TODO: to take this as input
  userName = 'admin';

  constructor(
    public router: Router,
    public discussService: DiscussionService
  ) { }

  ngOnInit() {
    this.discussService.userName = this.userName;
    this.discussService.initializeUserDetails(this.userName);
  }

  navigate(pageName: string) {
    this.router.navigate([`/discussion/${pageName}`]);
  }
}
