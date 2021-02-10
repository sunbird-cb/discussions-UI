import { DiscussionService } from '../../services/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IdiscussionConfig } from '../../models/discussion.model'


/* tslint:disable */
import * as _ from 'lodash'
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
/* tslint:enable */
@Component({
  selector: 'discussion-library',
  templateUrl: './discussion-library.component.html',
  styleUrls: ['./discussion-library.component.scss']
})
export class DiscussionLibraryComponent implements OnInit {

  state: any
  @Input() discussionConfig: IdiscussionConfig
  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
    private location: Location,
    private router: Router
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // this.state = navigation.extras.state as {
    //   transId: string,
    //   workQueue: boolean,
    //   services: number,
    //   code: string
    // };
    // console.log(this.state)
   }

  ngOnInit() {
    this.discussionService.discussionConfig = this.discussionConfig
    // this.activatedRoute.data.subscribe((data) => {
    //   debugger
    //   console.log('data',data)
    // })
    // this.state$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state))

    // console.log(this.state$)
    // this.state$.subscribe((data) => {
    //   console.log(data)
    // })
    // console.log(this.state)
  }

  goBack() {
    this.location.back();
  }

}
