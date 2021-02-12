import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { DiscussCardComponent } from './discuss-card/discuss-card.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { RelatedDiscussionComponent } from './related-discussion/related-discussion.component';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  declarations: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent,
    RelatedDiscussionComponent
  ],
  imports: [
    CommonModule, PipesModule
  ],
  exports: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent, RelatedDiscussionComponent
  ]
})
export class ElementsModule { }
