import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeFilterPipe } from './pipe-filter/pipe-filter.pipe';
import { SortByPipe } from './sort-by/sort-by.pipe';



@NgModule({
  declarations: [ PipeFilterPipe, SortByPipe ],
  imports: [
    CommonModule
  ],
  exports: [ PipeFilterPipe, SortByPipe ]
})
export class PipesModule { }
