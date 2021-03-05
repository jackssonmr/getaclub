import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxPopupModule,
  DxButtonModule,
  DxToolbarModule,
  DxPieChartModule
} from 'devextreme-angular';

import { Covid19RoutingModule } from './covid19-routing.module';
import { PersonComponent } from './components/person/person.component';
import { PersonContainerComponent } from './containers/person-container/person-container.component';
import { PersonViewComponent } from './views/person-view/person-view.component';
import { PersonaService } from './services/person.service';
import { PersonsComponent } from './components/persons/persons.component';
import { PersonsViewComponent } from './views/persons-view/persons-view.component';
import { PersonsContainerComponent } from './containers/persons-container/persons-container.component';

@NgModule({
  declarations: [
    PersonComponent,
    PersonContainerComponent,
    PersonViewComponent,
    PersonsComponent,
    PersonsViewComponent,
    PersonsContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxDataGridModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    Covid19RoutingModule
  ],
  providers: [
    PersonaService
  ],
  exports: [
      PersonComponent,
      PersonContainerComponent
  ]
})
export class Covid19Module { }
