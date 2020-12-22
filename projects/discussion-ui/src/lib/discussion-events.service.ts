import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionEventsService {

  public telemetryEvent = new Subject<any>();
  public actionEvent = new EventEmitter<any>();

  constructor() { }

  emitTelemetry(event) {
    console.log('evennene', event);
    this.telemetryEvent.next(event);
  }
}
