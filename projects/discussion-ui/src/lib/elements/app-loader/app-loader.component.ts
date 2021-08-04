import { Component, OnInit, Input, OnDestroy } from '@angular/core';

/* tslint:disable */
import * as _ from 'lodash'
import { Subscription, timer } from 'rxjs';
import { DiscussionService } from '../../services/discussion.service';
/* tslint:enable */

@Component({
  selector: 'lib-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit, OnDestroy {

  @Input() data;
  headerMessage: string;
  loaderMessage: string;
  countDown:Subscription;

  constructor(
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {
    this.headerMessage = 'Please wait';
    this.loaderMessage = 'We are fetching details';
    if (this.data) {
      this.headerMessage = _.get(this.data, 'headerMessage') || this.headerMessage;
      this.loaderMessage = _.get(this.data, 'loaderMessage') || this.loaderMessage;
    }
    this.countDown = timer(10000)
      .subscribe(() => {
        this.discussionService.alertEvent.next()
      });
  }

  ngOnDestroy(){
    this.countDown.unsubscribe();
  }
}

