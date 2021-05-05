import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NSDiscussData } from '../../models/discuss.model';
/* tslint:disable */
import _ from 'lodash'
/* tslint:enable */
@Component({
  selector: 'lib-discuss-trending-tags',
  templateUrl: './trending-tags.component.html',
  styleUrls: ['./trending-tags.component.scss'],
})
export class TrendingTagsComponent implements OnInit, OnChanges {
  @Input() tags!: NSDiscussData.ITag[];
  max = 0;
  trandingTags!: NSDiscussData.ITag[];
  constructor() {

  }
  ngOnInit(): void {
    this.max = _.get(_.maxBy(this.tags, 'score'), 'score') || 0;
    this.trandingTags = _.chain(this.tags).orderBy('score', 'desc').take(5).value();
  }

  ngOnChanges(data: SimpleChanges) {
    // this.tableData!.columns = data.tableData.currentValue.columns
    this.tags = _.get(data, 'tags.currentValue')
    this.max = _.get(_.maxBy(this.tags, 'score'), 'score') || 0;
    this.trandingTags = _.chain(this.tags).orderBy('score', 'desc').take(5).value();
  }

  css() {
    // return 'linear - gradient(to left, #00ff00 " + 80 + " %, #ff0000 20 %)"
  }
}
