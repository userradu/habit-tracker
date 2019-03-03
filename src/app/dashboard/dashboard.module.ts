import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardComponent
  ],
  imports: [
    BsDropdownModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
