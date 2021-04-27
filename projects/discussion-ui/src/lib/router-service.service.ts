import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterServiceService {

  constructor(public router: Router) { }

  navigate(input) {
    // this.router.navigate(url)
    this.router.navigate([input.data.url], { queryParams: input.data.queryParams, queryParamsHandling: "merge" })
  }
}