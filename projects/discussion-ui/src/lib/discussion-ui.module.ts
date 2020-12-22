import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';

import { NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';

@NgModule({
  declarations: [ LibEntryComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule
  ],
  exports: [ ComponentsModule ],
  providers: [ DiscussionEventsService ]
})
export class DiscussionUiModule { }
