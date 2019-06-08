import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DashboardMenuDataService {

	private dashboardMenuActionsSource = new BehaviorSubject(null);
	dashboardMenuActions$ = this.dashboardMenuActionsSource.asObservable();

	constructor() { }

	setAction(action) {
		this.dashboardMenuActionsSource.next(action)
	}

}
