import { TelemetryUtilsService } from './telemetry-utils.service';
import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';

import { NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';
import { ModuleWithProviders } from '@angular/core';
import { CategoryWidgetComponent } from './wrapper/category-widget/category-widget.component';
import { CommonModule } from '@angular/common';
import { BaseWrapperComponent } from './wrapper/base-wrapper/base-wrapper.component';
// import { TagsWidgetComponent } from './wrapper/tags-widget/tags-widget/tags-widget.component';

export function provideCsModule(){
  return window['CsModule'];
}
@NgModule({
  declarations: [ LibEntryComponent, CategoryWidgetComponent, BaseWrapperComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule,
    CommonModule,
  ],
  exports: [ ComponentsModule, CategoryWidgetComponent, BaseWrapperComponent ],
  providers: [ DiscussionEventsService, TelemetryUtilsService,{provide: 'CsModule', useFactory: provideCsModule} ]
})
export class DiscussionUiModule { 
  static forRoot(configService): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        {provide: 'configService', useClass: configService}
      ]
    };
  }
}
