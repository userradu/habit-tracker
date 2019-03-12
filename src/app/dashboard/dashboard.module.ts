import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard.component';
import {NgbDropdownModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardComponent,
    DashboardSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule
  ]
})
export class DashboardModule { }
