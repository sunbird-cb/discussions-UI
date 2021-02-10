import { TelemetryUtilsService } from './telemetry-utils.service';
import { ElementsModule } from './elements/elements.module';
import { DiscussionLibraryComponent } from './components/lib-entry/discussion-library.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';

import { NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';

export function provideCsModule(){
  return window['CsModule'];
}
@NgModule({
  declarations: [ DiscussionLibraryComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule
  ],
  exports: [ ComponentsModule, DiscussionLibraryComponent ],
  providers: [ DiscussionEventsService, TelemetryUtilsService,{provide: 'CsModule', useFactory: provideCsModule} ]
})
export class DiscussionUiModule { }
