import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { DiscussCardComponent } from './discuss-card/discuss-card.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { RelatedDiscussionComponent } from './related-discussion/related-discussion.component';
import { PipesModule } from './../pipes/pipes.module';

import { PostReplyComponent } from './post-reply/post-reply.component';
import { SlidersComponent } from './sliders/sliders.component';
import { PopularDiscussionsComponent } from './popular-discussions/popular-discussions.component';
@NgModule({
  declarations: [
    PostReplyComponent,
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent,
    RelatedDiscussionComponent,
    PopularDiscussionsComponent,
    SlidersComponent
  ],
  imports: [
    CommonModule, PipesModule,
     FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent, 
    RelatedDiscussionComponent,
    PopularDiscussionsComponent,
    AppLoaderComponent,
    PostReplyComponent,
    SlidersComponent
  ]
})
export class ElementsModule { }
