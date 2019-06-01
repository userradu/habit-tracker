import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HabitService } from 'src/app/shared/services/habit.service';
import { ParseServerErrorsService } from 'src/app/shared/services/parse-server-errors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-dashboard-sidebar',
	templateUrl: './dashboard-sidebar.component.html',
	styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {

	@ViewChild('contextMenu')
	contextMenu: ElementRef;

	showSidebar: boolean = true;
	habits: any[];
	selectedHabit: any;
	createHabitModal: NgbModalRef;
	deleteHabitModal: NgbModalRef;

	addHabitForm = this.fb.group({
		name: ['', Validators.required],
	});

	formSubmitted: boolean = false;

	@HostListener('document:click', ['$event'])
	documentClick(event) {
		let contextMenuIconClicked = event.target.classList.contains('context-menu-icon');
		let contextMenuClicked = event.target.closest(".context-menu");
		if (!contextMenuIconClicked && !contextMenuClicked) {
			this.contextMenu.nativeElement.style.display = "none";
			this.selectedHabit = null;
		}
	}

	constructor(
		private dashboardMenuDataService: DashboardMenuDataService,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private habitService: HabitService,
		private parseServerErrorService: ParseServerErrorsService,
		private toastr: ToastrService
	) { }

	ngOnInit() {
		this.dashboardMenuDataService.dashboardMenuActions$.subscribe(message => {
			if (message) {
				this.showSidebar = message.showSidebar;
			}
		});

		this.getAllHabits();
	}

	getAllHabits() {
		this.habitService.getAllHabits()
			.subscribe(result => this.habits = result.habits);
	}

	get name() {
		return this.addHabitForm.get('name');
	}

	openAddHabitModal(content: any) {
		this.resetAddHabitForm();
		this.createHabitModal = this.modalService.open(content);
	}

	resetAddHabitForm() {
		this.formSubmitted = false;
		this.addHabitForm.reset();
	}

	onCreateHabit() {
		this.formSubmitted = true;
		if (this.addHabitForm.valid) {
			this.habitService.createHabit(this.addHabitForm.value)
				.subscribe(
					() => {
						this.createHabitModal.close();
						this.getAllHabits();
						const message = 'The habit was created successfully'
						this.toastr.success('', message, {
							closeButton: true,
							timeOut: 0
						});
					},
					(response) => {
						let error = this.parseServerErrorService.parseError(response.error);
						this.toastr.error('', error, {
							closeButton: true,
							timeOut: 0
						});
					}
				);
		}
	}

	displayContextMenu(event: MouseEvent) {
		this.contextMenu.nativeElement.style.left = `${event.pageX}px`;
		this.contextMenu.nativeElement.style.top = `${event.pageY}px`;
		this.contextMenu.nativeElement.style.display = 'block';
	}

	editHabit() {

	}

	openDeleteHabitModal(content: any) {
		this.deleteHabitModal = this.modalService.open(content);
		this.contextMenu.nativeElement.style.display = 'none';
	}

	deleteHabit() {
		this.habitService.deleteHabit(this.selectedHabit._id)
			.subscribe(() => {
				this.getAllHabits();
				this.deleteHabitModal.close();
				const message = 'The habit was deleted'
				this.toastr.success('', message, {
					closeButton: true,
					timeOut: 0
				});
			});
	}
}
