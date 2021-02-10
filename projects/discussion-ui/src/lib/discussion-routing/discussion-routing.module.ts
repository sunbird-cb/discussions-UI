import { DiscussionDetailsComponent } from './../components/discussion-details/discussion-details.component';
import { MyDiscussionComponent } from './../components/my-discussion/my-discussion.component';
import { DiscussTagsComponent } from './../components/discuss-tags/discuss-tags.component';
import { DiscussCategoryComponent } from './../components/discuss-category/discuss-category.component';
import { DiscussionLibraryComponent } from '../components/lib-entry/discussion-library.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiscussHomeComponent } from './../components/discuss-home/discuss-home.component';


const routes: Routes = [
  {
    path: '',
    component: DiscussionLibraryComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: DiscussHomeComponent
      },
      {
        path: 'categories',
        pathMatch: 'full',
        component: DiscussCategoryComponent
      },
      {
        path: 'tags',
        pathMatch: 'full',
        component: DiscussTagsComponent
      },
      {
        path: 'my-discussion',
        pathMatch: 'full',
        component: MyDiscussionComponent
      },
      {
        path: 'category/:slug',
        pathMatch: 'full',
        component: DiscussHomeComponent
      },
      {
        path: 'topic/:topicId/:slug',
        pathMatch: 'full',
        component: DiscussionDetailsComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DiscussionRoutingModule { }
