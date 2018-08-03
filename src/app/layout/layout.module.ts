import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppHeaderComponent} from './app.header.component';
import {AppBodyComponent} from './app.body.component';
import {SiderLeftComponent} from './sider/sider.left.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {ColorPickerModule} from '@shared/color-picker/color-picker.module';
import {SchemaPillsComponent} from './sider/model/schema.component';
import {SiderRightComponent} from './sider/sider.right.component';
import {PropertyDataModule} from './sider/property.data/property.data.module';
import {TitleConfigComponent} from '../components/config/title.config.component';

const COMPONENTS = [
  AppHeaderComponent,
  AppBodyComponent,
  SiderLeftComponent,
  SiderRightComponent,
  SchemaPillsComponent,
  TitleConfigComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ColorPickerModule,
    PropertyDataModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule {
}
