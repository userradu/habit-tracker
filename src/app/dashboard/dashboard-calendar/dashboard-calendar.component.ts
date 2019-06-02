import { Component, OnInit } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';
import { DashboardSidebarMenuDataService } from 'src/app/shared/services/dashboard-sidebar-menu.data.service';
import { HistoryService } from 'src/app/shared/services/history.service';

@Component({
	selector: 'app-dashboard-calendar',
	templateUrl: './dashboard-calendar.component.html',
	styleUrls: ['./dashboard-calendar.component.css']
})
export class DashboardCalendarComponent implements OnInit {

	public selectedDate: Date;
	public monthWeeks: Array<any>;
	public fullWidth: boolean = false;
	selectedHabit: any;

	constructor(
		private dashboardMenuDataService: DashboardMenuDataService,
		private dashboardSidebarMenuDataService: DashboardSidebarMenuDataService,
		private historyService: HistoryService
	) { }

	ngOnInit() {
		this.selectedDate = new Date();
		this.createCalendar();

		this.dashboardMenuDataService.dashboardMenuActions$.subscribe(message => {
			if (message) {
				this.fullWidth = !message.showSidebar;
			}
		});

		this.dashboardSidebarMenuDataService.dashboardSidebarMenuActions$.subscribe(action => {
			if (action) {
				if (action.name == 'habit selected') {
					this.selectedHabit = action.habit;
					this.getHabitHistory();
				}
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
					this.monthWeeks[this.monthWeeks.length - 1].push(
						{
							date: new Date(
								this.selectedDate.getFullYear(),
								this.selectedDate.getMonth(),
								day
							),
							completed: false
						}
					);
					day++;
				}
			}
		}
	}

	getPreviousMonth() {
		this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1);
		this.createCalendar();
		this.getHabitHistory();
	}

	getNextMonth() {
		this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
		this.createCalendar();
		this.getHabitHistory();
	}

	getHabitHistory() {
		let filter = {
			year: this.selectedDate.getFullYear(),
			month: this.selectedDate.getMonth() + 1
		};
		this.historyService.getHabitHistory(this.selectedHabit._id, filter)
			.subscribe((res: any) => this.parseWeeks(res.history))
	}

	parseWeeks(history) {
		for (let i = 0; i < this.monthWeeks.length; i++) {
			for (let j = 0; j < this.monthWeeks[i].length; j++) {
				if (this.monthWeeks[i][j]) {
					this.monthWeeks[i][j].completed = false;
				}
			}
		}

		for (let i = 0; i < this.monthWeeks.length; i++) {

			for (let j = 0; j < this.monthWeeks[i].length; j++) {

				if (this.monthWeeks[i][j]) {
					for (let k = 0; k < history.length; k++) {
						let historyDate = new Date(history[k].date);

						if (this.monthWeeks[i][j].date.getTime() == historyDate.getTime()) {
							this.monthWeeks[i][j].completed = true;
							break;
						}
					}
				}

			}

		}
	}

	toggleHabitStatus(day: any) {
		if (!day.completed) {
			this.historyService.addDay(this.selectedHabit._id, day.date)
				.subscribe(() => {
					day.completed = true;
				})
		}
		else {
			this.historyService.deleteDay(this.selectedHabit._id, day.date)
				.subscribe(() => {
					day.completed = false;
				})
		}
	}

}
