import { Component, OnInit } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {

  public showSidebar: boolean = true;

  constructor(private dashboardMenuDataService: DashboardMenuDataService) { }

  ngOnInit() {
    this.dashboardMenuDataService.dashboardMenuActions$.subscribe(message => {
      if (message) {
        this.showSidebar = message.showSidebar;
      }
    });
  }

}
