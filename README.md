## Step 1: Install the package
```
   npm install

```
   
## Step 2: import  CsModule  from project-sunbird in root component
```
   import { CsModule } from '@project-sunbird/client-services'

```

## Step 3: initiate the CsModule in the root component
```
 constructor( ) {
     CsModule.instance.init({
      core: {
        httpAdapter: 'HttpClientBrowserAdapter',
        global: {
          channelId: '', // required
          producerId: '', // required
          deviceId: '', // required
        },
        api: {
          host: 'https://igot-sunbird.idc.tarento.com/apis/proxies/v8', // default host
          authentication: {
            // userToken: string; // optional
            bearerToken: "bearerToken"
          },
        },
      },
      services: {
        groupServiceConfig: {
          apiPath: '/learner/group/v1',
          dataApiPath: '/learner/data/v1/group',
          updateGroupGuidelinesApiPath: '/learner/group/membership/v1',
        },
        userServiceConfig: {
          apiPath: '/learner/user/v2',
        },
        formServiceConfig: {
          apiPath: '/learner/data/v1/form',
        },
        courseServiceConfig: {
          apiPath: '/learner/course/v1',
          certRegistrationApiPath: '/learner/certreg/v2/certs',
        },
        discussionServiceConfig: {
          apiPath: '/discussion',
        },
      },
    })
 }

 ```
 ## Step 4: import  DiscussionUiModule  from project-sunbird in app.module.ts

```
 import { DiscussionUiModule } from '@project-sunbird/discussions-ui-v8'
 import { ConfigService } from '/services/config.service'


 @NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DiscussionUiModule.forRoot(ConfigService),
    ],
    exports: [DiscussionUiModule],
})

```

 ## Step 5: Define the config service implementation which is used in above step

 ```

 import { Injectable } from '@angular/core'
 import { AbstractConfigService, IdiscussionConfig } from '@project-sunbird/discussions-ui-v8'

 @Injectable({
  providedIn: 'root'
 })
 export class ConfigService extends AbstractConfigService {

  constructor() {
    super()
  }

  getConfig(key: any): IdiscussionConfig {
    return localStorage.getItem(key)
  }

 }

```
 ## Step 6: Add the below route in router module for loading the library in routing mode

 ```

  {
    path: 'discussion-forum',
    loadChildren: () => import('@project-sunbird/discussions-ui-v8').then(u => u.DiscussionUiModule),
  }

 ```

 ## Step 7: Use the route to redirect to discussion-forum after  setting the config in local storage

 ```

 import { IdiscussionConfig } from '@project-sunbird/discussions-ui-v8'

   discussionConfig: IdiscussionConfig = {
    userName: 'nptest',
    categories: { result: ["2"] },
  }
  
  navigate() {
  localStorage.setItem('home', JSON.stringify(this.discussionConfig))
  this.router.navigate(['/discussion-forum'], { queryParams: { page: 'home' }, queryParamsHandling: "merge" })
  }

  ```

 ## Step 8: Use the selector of the widget as below  to use the  widgets in desired components with input

 ```

   <sb-category-widget [config]="discussionConfig"></sb-category-widget>

 ```

  Import the IdiscussionConfig interface from the library to know which data to pass.

  ```

  import { IdiscussionConfig } from '@project-sunbird/discussions-ui-v8'

  ```

  ## Available components
|Feature| Notes| Selector|
|--|--|--|
| [LibEntryComponent] | entry point for the library in routing mode| lib-lib-entry|
| [SidePannelComponent] | used for loading the menu items and switching between them |
| [ DiscussCategoryComponent ] |used to load the list of categories available |lib-discuss-category|
| [DiscussHomeComponent] | home component for categories | lib-discuss-home| [DiscussionDetailsComponent] | loads the category details  |ib-discussion-details|
| [DiscussTagsComponent] | displays all the tags available |lib-discuss-tags|
| [MyDiscussionComponent] | displays the user data |lib-my-discussion|
| [DiscussStartComponent] | used to start the discussion |lib-discuss-start|





