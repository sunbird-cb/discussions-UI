import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { WidgetResolverModule } from '@ws-widget/resolver'
import {
  GestureConfig,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSliderModule,
  MatToolbarModule,
  MatTooltipModule,
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material'
import { LoggerService } from '@ws-widget/utils/src/public-api';
import { InitService } from './services/init.service';
import { AppInterceptorService } from './services/app-interceptor.service';
import { KeycloakAngularModule } from 'keycloak-angular';
import { WIDGET_REGISTERED_MODULES, StickyHeaderModule, WIDGET_REGISTRATION_CONFIG, ErrorResolverModule } from '@ws-widget/collection/src/public-api';

// const appInitializer = (initSvc: InitService, logger: LoggerService) => async () => {
//   try {
//     await initSvc.init()
//   } catch (error) {
//     logger.error('ERROR DURING APP INITIALIZATION >', error)
//   }
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    KeycloakAngularModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    ...WIDGET_REGISTERED_MODULES,
    WidgetResolverModule.forRoot(WIDGET_REGISTRATION_CONFIG),
    StickyHeaderModule,
    ErrorResolverModule
  ],
  providers: [
    // {
    //   deps: [InitService, LoggerService],
    //   multi: true,
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    // },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
