import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash-es';
@Injectable({
  providedIn: 'root'
})
export class DiscussionEventsService {

  public telemetryEvent = new Subject<any>();
  public actionEvent = new EventEmitter<any>();

  constructor() { }

  emitTelemetry(event) {
    console.log('Lib Event', event);
    if (!_.isEmpty(event)) {
      this.telemetryEvent.next(event);
    }
  }
}
