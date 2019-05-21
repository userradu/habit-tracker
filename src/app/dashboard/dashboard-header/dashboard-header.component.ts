import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './dashboard-header.component.html',
	styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

	public isUserSectionCollapsed = true;
	public displaySidebarSwitch: FormControl;
	public screenWidth: number;
	private hideSidebarBreakpoint = 576;

	constructor(
		private dashboardMenuDataService: DashboardMenuDataService,
		private authService: AuthService) {
		this.displaySidebarSwitch = new FormControl(true);
	}

	ngOnInit() {
		this.onChanges();
		this.getScreenSize();
	}

	@HostListener('window:resize', ['$event'])
	getScreenSize(event?) {
		if (window.innerWidth <= this.hideSidebarBreakpoint) {
			this.displaySidebarSwitch.setValue(false);
		}
	}

	onChanges() {
		this.displaySidebarSwitch.valueChanges.subscribe(checked => {
			this.dashboardMenuDataService.setAction({
				showSidebar: checked
			});
		});
	}

	logout() {
		this.authService.logout();
	}

}
