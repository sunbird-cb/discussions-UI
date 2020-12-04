
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NSDiscussData } from '../../models/discuss.model'

@Component({
  selector: 'app-discuss-categories',
  templateUrl: './discuss-categories.component.html',
  styleUrls: ['./discuss-categories.component.scss'],
})
export class DiscussCategoriesComponent implements OnInit {
  data = this.route.snapshot.data.availCategories.data
  categories!: NSDiscussData.ICategorie[]

  constructor(private route: ActivatedRoute, private router: Router) {
    this.categories = this.data.categories;
    console.log(this.categories);
  }

  ngOnInit(): void { }

  navigateToDiscussionPage(slug) {
    console.log('clicked', slug);
    this.router.navigate(['/discuss/home/', `${slug}`]);
  }
}
