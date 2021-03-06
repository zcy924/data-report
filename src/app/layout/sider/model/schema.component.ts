import {
  AfterViewInit,
  Component,
  Input,
  KeyValueDiffer,
  KeyValueDiffers, OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TableSchema} from '../../../core/model/table.schema';
import {draggableHeler} from '../../../utils/draggable.helper';
import {DataSet} from '../../../core/adapter/groupBy';
import {DatasetWrapper} from '@core/dataset/dataset.interface';
import {datasetManager} from '@core/dataset/dataset.manager';


interface Dimension {
  name: string;
  displayName: string;
  type?: 'number' | 'ordinal';
}

type Dimensions = Array<Dimension | string>;


@Component({
  selector: '[schema-pills]',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.less']
})
export class SchemaPillsComponent implements AfterViewInit, OnChanges {
  // schema: TableSchema = new TableSchema(demo);
  datasetWrapper: DatasetWrapper;

  constructor() {
    this.datasetWrapper = datasetManager.getDefaultDataset();
  }

  @Input() modelName: string;

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log('hhaahahahahhahah', prev, cur);
      if (datasetManager.getDataset(chng.currentValue)) {
        this.datasetWrapper = datasetManager.getDataset(chng.currentValue);
      }
    }
  }

  ngAfterViewInit() {
  }

  doDragStart(event: DragEvent, item) {
    console.log(event);
    console.log((<HTMLElement>event.target).getAttribute('fieldid'));
    event.dataTransfer.setData('Text', (<HTMLElement>event.target).getAttribute('fieldid'));
    draggableHeler.dragInfo = item;
  }

  tableClick($event: MouseEvent, tableType: string) {
    console.log($event);
    const $target = $($event.target);
    if ($target.data('switch') === 'true') {
      $target.find('i').addClass('u-icn-angle-right').removeClass('u-icn-angle-right');
      $target.data('switch', 'false');
    } else {
      $target.find('i').removeClass('u-icn-angle-right').addClass('u-icn-angle-right');
      $target.data('switch', 'true');
    }
    $(`li[datasetname='${tableType + this.datasetWrapper.name}']`).toggle();
  }
}

