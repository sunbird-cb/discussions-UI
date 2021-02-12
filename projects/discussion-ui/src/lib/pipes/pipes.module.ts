import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeFilterPipe } from './pipe-filter/pipe-filter.pipe';
import { SortByPipe } from './sort-by/sort-by.pipe';
import { PipeRelativeTimePipe } from './pipe-relative-time/pipe-relative-time.pipe';



@NgModule({
  declarations: [PipeFilterPipe, SortByPipe, PipeRelativeTimePipe],
  imports: [
    CommonModule
  ],
  exports: [PipeFilterPipe, SortByPipe, PipeRelativeTimePipe]
})
export class PipesModule { }
