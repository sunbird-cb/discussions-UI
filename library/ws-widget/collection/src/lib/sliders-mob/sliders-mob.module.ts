import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { ImageResponsiveModule, NavigationModule } from '@ws-widget/utils'
import { SlidersMobComponent } from './sliders-mob.component'

// tslint:disable-next-line: max-classes-per-file
@NgModule({
  declarations: [SlidersMobComponent],
  imports: [CommonModule, RouterModule, NavigationModule, ImageResponsiveModule],
  entryComponents: [SlidersMobComponent],
  providers: [ ],
})
export class SlidersMobModule {}
