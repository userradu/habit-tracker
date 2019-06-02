import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardSidebarMenuDataService {

  private dashboardSidebarMenuActionsSource = new BehaviorSubject(null);
  dashboardSidebarMenuActions$ = this.dashboardSidebarMenuActionsSource.asObservable();

  constructor() { }

  setAction(action) {
    this.dashboardSidebarMenuActionsSource.next(action)
  }

}
