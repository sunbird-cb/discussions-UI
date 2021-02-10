import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { DiscussionService } from '../services/discussion.service';
import { Observable, of } from 'rxjs'
import { map, catchError, first } from 'rxjs/operators'

@Injectable()

export class DiscussionResolve implements  Resolve<any>{
    constructor(private discussService: DiscussionService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
      ): Observable<any> {
        return this.discussService
          .fetchProfileInfo(localStorage.getItem('userName'))
          .pipe(
            first(),
            map(data => ({ data, error: null })),
            catchError(error => of({ error, data: null })),
          )
      }

}