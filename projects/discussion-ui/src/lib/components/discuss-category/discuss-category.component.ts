import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../../services/discussion.service';
import { NSDiscussData } from './../../models/discuss.model';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-discuss-category',
  templateUrl: './discuss-category.component.html',
  styleUrls: ['./discuss-category.component.css']
})
export class DiscussCategoryComponent implements OnInit {

  categories: NSDiscussData.ICategorie[];

  constructor(
    public discussService: DiscussionService,
    public router: Router) { }

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

  navigateToDiscussionPage(slug) {
    console.log('clicked', slug);
    this.router.navigate([`/discussion/home/`, `${slug}`]);
  }
}
