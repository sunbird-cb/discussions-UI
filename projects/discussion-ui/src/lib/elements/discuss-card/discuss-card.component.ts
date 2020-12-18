import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-discuss-card',
  templateUrl: './discuss-card.component.html',
  styleUrls: ['./discuss-card.component.css']
})
export class DiscussCardComponent implements OnInit {

  @Input() discussionData: any;

  constructor() { }

  ngOnInit() {
    console.log('discussionData', this.discussionData);
  }

}
