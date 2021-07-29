import { TelemetryUtilsService } from './telemetry-utils.service';
import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';

import { NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';
import { CommonModule } from '@angular/common';

export function provideCsModule(){
  return window['CsModule'];
}
@NgModule({
  declarations: [ LibEntryComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule,
    CommonModule
  ],
  exports: [ ComponentsModule ],
  providers: [ DiscussionEventsService, TelemetryUtilsService,{provide: 'CsModule', useFactory: provideCsModule} ]
})
export class DiscussionUiModule { }
