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
    this.fetchUserProfile(this.userName);
  }

  navigate(pageName: string) {
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
