import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit {
  headerMessage: string;
  loaderMessage: string;
  
  constructor() { }

  ngOnInit() {
      // this.headerMessage = _.get(this.resourceService.messages.fmsg, 'm0087');
      // this.loaderMessage = _.get(this.resourceService.messages.fmsg, 'm0088');
      // if (this.data) {
      //   this.headerMessage = this.data.headerMessage || this.headerMessage;
      //   this.loaderMessage = this.data.loaderMessage || this.loaderMessage;
      }

}

