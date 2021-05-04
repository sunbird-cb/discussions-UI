import { TelemetryUtilsService } from './telemetry-utils.service';
import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';

export function provideCsModule() {
  return window['CsModule'];
}
@NgModule({
  declarations: [LibEntryComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule
  ],
  exports: [ComponentsModule],
  providers: [DiscussionEventsService, TelemetryUtilsService, { provide: 'CsModule', useFactory: provideCsModule }]
})
export class DiscussionUiModule { }
