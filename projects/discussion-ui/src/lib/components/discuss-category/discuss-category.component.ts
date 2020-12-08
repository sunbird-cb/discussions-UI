import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';

@Component({
  selector: 'lib-discuss-category',
  templateUrl: './discuss-category.component.html',
  styleUrls: ['./discuss-category.component.css']
})
export class DiscussCategoryComponent implements OnInit {

  categories: NSDiscussData.ICategorie[];

  constructor( public discussService: DiscussionService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // Get all categories 
    this.discussService.fetchAllCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    }, error => {
      console.log(error);
    });
  }
}
