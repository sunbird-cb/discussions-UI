import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageResolve } from '@ws-widget/utils/src/public-api';

const routes: Routes = [ 
  {
    path: 'discuss',
    loadChildren: () => import('../routes/route-discuss.module').then(u => u.RouteDiscussModule),
    data: {
      pageType: 'feature',
      pageKey: 'home',
    },
    resolve: {
      pageData: PageResolve
    }
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top',
      urlUpdateStrategy: 'eager',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 80],
    }),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
