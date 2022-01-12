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

  changeTheme() {
    this.dataThemeAttribute = document.documentElement.getAttribute('data-theme');
    this.dataThemeAttribute = this.dataThemeAttribute === 'default' ? 'darkmode' : 'default';
    document.documentElement.setAttribute('data-theme', this.dataThemeAttribute);
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
}