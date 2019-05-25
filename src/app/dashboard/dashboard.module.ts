import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard.component';
import {
  NgbDropdownModule, 
  NgbCollapseModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardCalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbModalModule
  ]
})
export class DashboardModule { }
