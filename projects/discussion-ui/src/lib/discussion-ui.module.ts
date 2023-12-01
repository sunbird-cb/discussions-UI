import { ElementsModule } from './elements/elements.module';
import { LibEntryComponent } from './components/lib-entry/lib-entry.component';
import { ComponentsModule } from './components/components.module';
import { DiscussionRoutingModule } from './discussion-routing/discussion-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

// tslint:disable-next-line:function-name
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [ LibEntryComponent],
  imports: [
    ComponentsModule,
    DiscussionRoutingModule,
    ElementsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ ComponentsModule ]
})
export class DiscussionUiModule { }
