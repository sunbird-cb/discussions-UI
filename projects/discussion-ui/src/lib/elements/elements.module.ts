import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import { DiscussCardComponent } from './discuss-card/discuss-card.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
@NgModule({
  declarations: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CategoryCardComponent,
    DiscussCardComponent,
    AvatarPhotoComponent
  ]
})
export class ElementsModule { }
