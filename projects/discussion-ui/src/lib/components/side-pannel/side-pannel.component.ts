import { NSDiscussData } from './../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
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
  hideSidePanel: boolean;
  constructor(
    public router: Router,
    public discussService: DiscussionService,
    private telemetryUtils: TelemetryUtilsService,
  ) { }

  ngOnInit() {
    this.telemetryUtils.context = [];
    this.hideSidePanel = document.body.classList.contains('widget');
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.HOME);
  
    this.discussService.userName = this.userName;
    this.fetchUserProfile(this.userName);
  }

  navigate(pageName: string, event) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.HOME);
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
