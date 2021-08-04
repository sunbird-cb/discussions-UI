import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiscussionService } from './../../services/discussion.service';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NSDiscussData } from './../../models/discuss.model';
import { TelemetryUtilsService } from './../../telemetry-utils.service';
import { DiscussUtilsService } from '../../services/discuss-utils.service';
/* tslint:disable */
import * as _ from 'lodash'
import { ConfigService } from '../../services/config.service';
import { DiscussionEventsService } from '../../discussion-events.service';
/* tslint:enable */

@Component({
  selector: 'lib-load-alert',
  templateUrl: './load-alert.component.html',
  styleUrls: ['./load-alert.component.scss']
})
export class LoadAlertComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() exit = new EventEmitter(); 

  constructor(
    private telemetryUtils: TelemetryUtilsService,
  ) { }

  ngOnInit() {
    this.telemetryUtils.logImpression(NSDiscussData.IPageName.LOAD_ALERT);
  }

  exitForum(event: string) {
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.LOAD_ALERT);
    this.exit.emit(event);
  }

  closeModal(event){
    this.telemetryUtils.logInteract(event, NSDiscussData.IPageName.LOAD_ALERT);
    this.close.emit();
  }

  
}

