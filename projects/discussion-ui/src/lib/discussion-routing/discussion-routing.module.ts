import { DiscussionDetailsComponent } from './../components/discussion-details/discussion-details.component';
import { MyDiscussionComponent } from './../components/my-discussion/my-discussion.component';
import { DiscussTagsComponent } from './../components/discuss-tags/discuss-tags.component';
import { DiscussCategoryComponent } from './../components/discuss-category/discuss-category.component';
import { LibEntryComponent } from './../components/lib-entry/lib-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiscussHomeComponent } from './../components/discuss-home/discuss-home.component';


const routes: Routes = [
  {
    path: '',
    component: LibEntryComponent,
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: DiscussHomeComponent,
        data: 
          {
            pageId: 'discussion-home'
          }
        
      },
      {
        path: 'categories',
        pathMatch: 'full',
        component: DiscussCategoryComponent,
        data: 
          {
            pageId: 'discussion-category'
          }
        
      },
      {
        path: 'tags',
        pathMatch: 'full',
        component: DiscussTagsComponent,
        data: 
          {
            pageId: 'discussion-tags'
          }
        
      },
      {
        path: 'my-discussion',
        pathMatch: 'full',
        component: MyDiscussionComponent,
        data: 
          {
            pageId: 'my-discussion'
          }
        
      },
      {
        path: 'category/:slug',
        pathMatch: 'full',
        component: DiscussHomeComponent,
        data: 
          {
            pageId: 'discussion-category'
          }
        
      },
      {
        path: 'category/:topicId/:slug',
        pathMatch: 'full',
        component: DiscussionDetailsComponent,
        data: 
          {
            pageId: 'discussion-details'
          }
        
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
