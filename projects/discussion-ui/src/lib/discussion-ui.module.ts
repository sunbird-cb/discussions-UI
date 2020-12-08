import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';

import { NgModule } from '@angular/core';


@NgModule({
  declarations: [ LibEntryComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule
  ],
  exports: [ ComponentsModule ]
})
export class DiscussionUiModule { }
