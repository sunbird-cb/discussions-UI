import { DiscussionService } from './../services/discussion.service';
import { HttpClientModule } from '@angular/common/http';
import { ElementsModule } from './../elements/elements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePannelComponent } from './side-pannel/side-pannel.component';
import { DiscussHomeComponent } from './discuss-home/discuss-home.component';
import { DiscussCategoryComponent } from './discuss-category/discuss-category.component';
import { DiscussTagsComponent } from './discuss-tags/discuss-tags.component';
import { MyDiscussionComponent } from './my-discussion/my-discussion.component';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscussStartComponent } from './discuss-start/discuss-start.component';


@NgModule({
  declarations: [
    SidePannelComponent,
    DiscussHomeComponent,
    DiscussCategoryComponent,
    DiscussTagsComponent,
    MyDiscussionComponent,
    DiscussionDetailsComponent,
    DiscussStartComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ElementsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidePannelComponent,
    DiscussHomeComponent,
    DiscussCategoryComponent,
    DiscussTagsComponent,
    MyDiscussionComponent,
    DiscussionDetailsComponent,
    DiscussStartComponent
  ],
  providers: [
    DiscussionService
  ]
})
export class ComponentsModule { }
