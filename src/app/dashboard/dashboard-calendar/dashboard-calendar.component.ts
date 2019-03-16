import { Component, OnInit } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrls: ['./dashboard-calendar.component.css']
})
export class DashboardCalendarComponent implements OnInit {

  public selectedDate: Date;
  public monthWeeks: Array<any>;
  public fullWidth: boolean = false;

  constructor(private dashboardMenuDataService: DashboardMenuDataService) { }

  ngOnInit() {
    this.selectedDate = new Date();
    this.createCalendar();

    this.dashboardMenuDataService.dashboardMenuActions$.subscribe(message => {
      if (message) {
        this.fullWidth = !message.showSidebar;
      }
    });
  }

  getNumberOfWeeksInMonth(year: number, month: number) {
    var firstOfMonth = new Date(year, month, 1);
    var lastOfMonth = new Date(year, month + 1, 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  createCalendar() {
    this.monthWeeks = [];
    let numberOfDays = new Date(this.selectedDate.getFullYear(), (this.selectedDate.getMonth() + 1), 0).getDate();
    let firstDay = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getDay();
    let day = 1;
    let numberOfWeeks = this.getNumberOfWeeksInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());

    for (var i = 0; i < numberOfWeeks; i++) {
      this.monthWeeks.push([]);
      for (var j = 0; j < 7; j++) {
        if (day > numberOfDays) break;

        if (i == 0 && j < firstDay) {
          this.monthWeeks[this.monthWeeks.length - 1].push(null);
        }
        else {
          this.monthWeeks[this.monthWeeks.length - 1].push(day);
          day++;
        }
      }
    }
  }

  getPreviousMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1);
    this.createCalendar();
  }

  getNextMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    this.createCalendar();
  }

}
