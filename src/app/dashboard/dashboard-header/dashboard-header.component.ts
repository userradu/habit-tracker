import { Component, OnInit } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  public isUserSectionCollapsed = true;
  public switch: FormControl;

  constructor(private dashboardMenuDataService: DashboardMenuDataService) {
    this.switch = new FormControl(true);
  }

  ngOnInit() {
    this.switch.valueChanges.subscribe(checked => {
      this.dashboardMenuDataService.setAction({
        showSidebar: checked
      });
    });

  }

}
