import {
  AfterViewInit,
  Component,
  ComponentFactory, ComponentFactoryResolver, ComponentRef,
  KeyValueDiffer,
  KeyValueDiffers, NgZone,
  OnInit, Type,
  ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppBodyComponent} from '../app.body.component';
import {reportGlobal} from '../../node/region/region';
import {DataHeaderComponent, IDataComponent} from './property.data/html/header.component';

export var siderLeftComponent: SiderLeftComponent;

@Component({
  selector: 'app-sider-left',
  templateUrl: './sider.left.component.html',
  styleUrls: ['./sider.left.component.less']
})
export class SiderLeftComponent implements AfterViewInit, OnInit {


  @ViewChild('dataComponent', {read: ViewContainerRef}) container: ViewContainerRef;

  @ViewChild(NgForm) ngForm: NgForm;

  option = {
    title: {
      show: true,
      text: '大水牛',
      left: 'auto',
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      backgroundColor: '#fff',
      textStyle: {
        align: 'left'
      }
    },
    color: []
  };
  private _differ: KeyValueDiffer<any, any>;
  componentRef: any;


  listOfOption = [
    {
      label: '#61a0a8',
      value: '#61a0a8'
    }, {
      label: '#2f4554',
      value: '#2f4554'
    }
  ];

  constructor(private _differs: KeyValueDiffers,
              /*              private appBody: AppBodyComponent,*/
              private resolver: ComponentFactoryResolver,
              private zone: NgZone) {
  }

  ngOnInit() {
    this._differ = this._differs.find(this.option).create();
  }

  createComponent(type: string) {
    this.container.clear();
    const factory: ComponentFactory<DataHeaderComponent> =
      this.resolver.resolveComponentFactory(DataHeaderComponent);
    this.componentRef = this.container.createComponent(factory);
    // this.componentRef.instance.type = type;
    this.componentRef.instance.output.subscribe((msg: string) => {
      console.log('我是', msg);
      if (reportGlobal.instance) {
        reportGlobal.instance.update(msg);
      }
    });
  }

  createDataProperty(type: Type<IDataComponent>): ComponentRef<IDataComponent> {
    let retComponentRef: ComponentRef<IDataComponent>;
    this.zone.run(() => {
      this.container.detach();
      this.container.clear();
      const factory: ComponentFactory<IDataComponent> =
        this.resolver.resolveComponentFactory(type);
      retComponentRef = this.componentRef = this.container.createComponent(factory);
      // this.componentRef.instance.type = type;
      this.componentRef.instance.output.subscribe((msg: string) => {
        console.log('我是', msg);
        if (reportGlobal.instance) {
          reportGlobal.instance.update(msg);
        }
      });
    });
    return retComponentRef;
  }

  attachDataProperty(viewRef: ViewRef) {
    this.zone.run(() => {
      this.container.detach();
      this.container.clear();
      this.container.insert(viewRef);
    });
  }


  ngAfterViewInit() {
    console.log(this.ngForm);
    this.ngForm.valueChanges.subscribe((value) => {
      console.log(value);
      console.log(this.option);
      const changes = this._differ.diff(value);
      if (changes) {
        console.log('has change');
        if (reportGlobal.instance) {
          reportGlobal.instance.update(value);
        }
        // if (this.appBody.chart) {
        //   this.appBody.chart.setOption(value);
        // }
        //this._applyChanges(changes);
      }

    });

    var that = this;

    siderLeftComponent = this;
  }

}
