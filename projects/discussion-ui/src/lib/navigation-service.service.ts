import { Injectable, OnInit } from '@angular/core';
import { RouterServiceService } from './router-service.service';
import { WrapperNavigateService } from './wrapper-navigate.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  navigateService: any = "routerService"

  
  constructor(private wrapperService: WrapperNavigateService,private routerService:  RouterServiceService) { }
  /**
   * @param  {string} wrapperService
   */
  initService(wrapperService: string) {
    this.navigateService = wrapperService
   }
   /**
    * @param  {} input
    */
   navigate(input){
     if(this.navigateService === 'routerService'){
       this.routerService.navigate(input)
     }else{
       this.wrapperService.navigate(input)
     }
   }

}
