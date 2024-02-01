import { TelemetryUtilsService } from './telemetry-utils.service';
import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';
import { CategoryWidgetComponent } from './wrapper/category-widget/category-widget.component';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { DiscussionEventsService } from './discussion-events.service';
import { BaseWrapperComponent } from './wrapper/base-wrapper/base-wrapper.component';
import { CommonModule } from '@angular/common';
import { TagsWidgetComponent } from './wrapper/tags-widget/tags-widget.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

// tslint:disable-next-line:function-name
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
export function provideCsModule(){
  return window['CsModule'];
}
@NgModule({
  declarations: [ LibEntryComponent, CategoryWidgetComponent, BaseWrapperComponent, TagsWidgetComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ ComponentsModule , CategoryWidgetComponent, BaseWrapperComponent, TagsWidgetComponent ],
  providers: [ DiscussionEventsService, TelemetryUtilsService, { provide: 'CsModule', useFactory: provideCsModule } ]
})
export class DiscussionUiModule { 
  static forRoot(configService: any): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        {provide: 'configService', useClass: configService}
      ]
    };
  }
}
