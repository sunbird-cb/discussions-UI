
import { DiscussionEventsService } from './discussion-events.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
interface ITelemetryObj {
  eid: string,
  edata: {},
  context?: Array<{}>
}

@Injectable({
  providedIn: 'root'
})
export class TelemetryUtilsService {

  _context = []

  constructor(
    private discussionEvents: DiscussionEventsService,
    private router: Router
  ) { }

  set context(context) {
    this._context = context;
  }

  uppendContext(data) {
    if (!_.isEmpty(data)) {
      this._context.push(data);
    }
  }

  logImpression(pageId) {
    this.discussionEvents.emitTelemetry({});
    const impressionEvent: ITelemetryObj = {
      eid: 'IMPRESSION',
      edata: {
        type: 'view',
        pageid: pageId,
        uri: this.router.url
      }
    }
    impressionEvent.context = this._context;
    this.discussionEvents.emitTelemetry(impressionEvent);
  }

  logInteract(event, pageId) {
    const target = _.get(event, 'currentTarget.attributes.id') || _.get(event, 'target.attributes.id') || _.get(event, 'srcElement.attributes.id')
    const interactEvent: ITelemetryObj = {
      eid: 'INTERACT',
      edata: {
        id: _.get(target, 'value'),
        type: 'CLICK',
        pageid: pageId
      }
    };
    interactEvent.context = this._context;

    this.discussionEvents.emitTelemetry(interactEvent);
  }

}
