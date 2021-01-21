import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { DiscussCardComponent } from './discuss-card/discuss-card.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { PostReplyComponent } from './post-reply/post-reply.component';
@NgModule({
  declarations: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent,
    PostReplyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent,
    AppLoaderComponent,
    PostReplyComponent
  ]
})
export class ElementsModule { }
