import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class WrapperNavigateService {

  closeSideNav = new EventEmitter()

  constructor(private _eventService: EventsService) { }

  navigate(input){ 
  //  this._eventService.toggle(input)
  }
}
