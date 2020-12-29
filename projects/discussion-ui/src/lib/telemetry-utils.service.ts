
import { DiscussionEventsService } from './discussion-events.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
interface ITelemetryObj {
  eid: string,
  edata: {},
  context?: {}
}

@Injectable({
  providedIn: 'root'
})
export class TelemetryUtilsService {

  _context = []
  currentObj = {};

  constructor(
    private discussionEvents: DiscussionEventsService,
    private router: Router
  ) { }

  setContext(context) {
    this._context = context;
    this.currentObj = _.last(context);
  }

  uppendContext(data) {
    const matchedC = _.find(this._context, { id: data.id });
    if (!_.isEmpty(data) && !_.isEqual(data, matchedC)) {
      this._context.push(data);
    }
    this.currentObj = _.last(this._context);
  }

  deleteContext(prevTopic) {
    const topic = _.find(this._context, prevTopic);
    if (topic) {
      this._context = _.reject(this._context, topic);
    }
  }

  getContext() {
    return this._context;
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
    if (this.currentObj) {
      impressionEvent.context = { cdata: [this.currentObj]};
    }
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

    if (this.currentObj) {
      const object = {
        id: _.get(this.currentObj, 'id'),
        type: _.get(this.currentObj, 'type'),
        ver: '1'
      }
      object['rollup'] = this._context.length > 1 ?  this.getRollUp() : {};
      interactEvent.context = { cdata: [this.currentObj], object };
    }

    this.discussionEvents.emitTelemetry(interactEvent);
  }

  getRollUp() {

      const rollUp = {};
      const data = _.reject(this._context, this.currentObj);

      if (this._context.length > 1) {
        data.forEach((element, index) => {
          console.log('rollup', element);
          rollUp['l' + (index + 1)] = element
        });
      }

      if (_.get(this.currentObj, 'type') !== 'Post') {
        return rollUp;
      }

      return {};

  }

}
