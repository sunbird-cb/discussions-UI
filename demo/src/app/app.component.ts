import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CsModule } from '@project-sunbird/client-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';
  dataThemeAttribute: string;
  @ViewChild('darkThemeToggle', { static: true }) darkThemeToggle: ElementRef;
  constructor(public router: Router, private renderer: Renderer2) {
  }
  ngOnInit() {
    CsModule.instance.init({
      core: {
        httpAdapter: 'HttpClientBrowserAdapter',
        global: {
          channelId: '', // required
          producerId: '', // required
          deviceId: '' // required
        },
        api: {
          host: 'http://localhost:3002', // default host
          authentication: {
            // userToken: string; // optional
            // bearerToken: string; // optional
          }
        }
      },
      services: {
        groupServiceConfig: {
          apiPath: '/learner/group/v1',
          dataApiPath: '/learner/data/v1/group',
          updateGroupGuidelinesApiPath: '/learner/group/membership/v1'
        },
        userServiceConfig: {
          apiPath: '/learner/user/v2',
        },
        formServiceConfig: {
          apiPath: '/learner/data/v1/form',
        },
        courseServiceConfig: {
          apiPath: '/learner/course/v1',
          certRegistrationApiPath: '/learner/certreg/v2/certs'
        },
        discussionServiceConfig: {
          apiPath: '/discussion'
        }
      }
    });
  }

  changeMode(){
    this.dataThemeAttribute = document.documentElement.getAttribute('data-mode');
    this.dataThemeAttribute = this.dataThemeAttribute === 'Light' ? 'Dark' : 'Light';
    document.documentElement.setAttribute('data-mode', this.dataThemeAttribute);
  }

  changeLayout() {
    this.dataThemeAttribute = document.documentElement.getAttribute('layout');
    this.dataThemeAttribute = this.dataThemeAttribute === 'old' ? 'joy' : 'old';
    document.documentElement.setAttribute('layout', this.dataThemeAttribute);
  }

  navigate() {
    // const result = [16];
    this.router.navigate(['/discussion-forum'], {
      queryParams: {
        categories: JSON.stringify({ result: [16] }),
        userId: 10
      }
    });
  }

  DefaultTheme(){
    this.dataThemeAttribute = document.documentElement.getAttribute('data-theme');
    this.dataThemeAttribute = this.dataThemeAttribute === 'Default' ? 'Default' : 'Default';
    document.documentElement.setAttribute('data-theme', this.dataThemeAttribute);
  }

  GreenTheme(){
    this.dataThemeAttribute = document.documentElement.getAttribute('data-theme');
    this.dataThemeAttribute = this.dataThemeAttribute === 'Green' ? 'Green' : 'Green';
    document.documentElement.setAttribute('data-theme', this.dataThemeAttribute);
  }

  OrangeTheme(){
    this.dataThemeAttribute = document.documentElement.getAttribute('data-theme');
    this.dataThemeAttribute = this.dataThemeAttribute === 'Orange' ? 'Orange' : 'Orange';
    document.documentElement.setAttribute('data-theme', this.dataThemeAttribute);
  }
}