import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  navigate(pageName: string) {
    this.router.navigate([`/discussion/${pageName}`]);
  }

}
