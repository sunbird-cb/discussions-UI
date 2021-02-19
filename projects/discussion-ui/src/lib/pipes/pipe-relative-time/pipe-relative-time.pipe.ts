



import { Pipe, PipeTransform } from '@angular/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

@Pipe({
  name: 'pipeRelativeTime',
})
export class PipeRelativeTimePipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      return dayjs((new Date(value))).fromNow()
    }
    return dayjs().startOf('hour').fromNow()
  }
}


