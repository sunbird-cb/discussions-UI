import { Pipe, PipeTransform } from '@angular/core';

import { orderBy } from 'lodash-es';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(data: any[], sortField: string, sortOrder: string): any[] {
    if (!data || !data.length || sortOrder === '' || !sortOrder) { return data; }
    if (!sortField || sortField === '') {
      data = data.map(e => e.trim());
      if (sortOrder === 'asc') {
        return data.sort();
      } else {
        return data.sort().reverse();
      }
    }
    data.forEach((obj) => {
      obj[sortField] = obj[sortField].trim();
    });
    return orderBy(data, [sortField], [sortOrder]);
  }

}
