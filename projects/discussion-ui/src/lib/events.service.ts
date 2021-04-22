import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, ReplaySubject } from 'rxjs'
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _navItemSource = new BehaviorSubject<any>(0);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  registeredEvents: Array<Object> = [];
  toggleMenuItem: ReplaySubject<any> = new ReplaySubject(1)

  constructor() { }

  toggle(data) {
    this.toggleMenuItem.next(data);
  }

}
