import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DashboardMenuDataService } from 'src/app/shared/services/dashboard-menu-data.service.ts.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HabitService } from 'src/app/shared/services/habit.service';
import { ParseServerErrorsService } from 'src/app/shared/services/parse-server-errors.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardSidebarMenuDataService } from 'src/app/shared/services/dashboard-sidebar-menu.data.service';

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
	deleteHabitModal: NgbModalRef;
	editHabitModal: NgbModalRef;
	actionType: string;

	editHabitForm = this.fb.group({
		name: ['', Validators.required],
	});

	formSubmitted: boolean = false;

	@HostListener('document:click', ['$event'])
	documentClick(event) {
		let contextMenuIconClicked = event.target.classList.contains('context-menu-icon');
		let contextMenuClicked = event.target.closest(".context-menu");
		if (!contextMenuIconClicked && !contextMenuClicked) {
			this.contextMenu.nativeElement.style.display = "none";
		}
	}

	constructor(
		private dashboardMenuDataService: DashboardMenuDataService,
		private dashboardSidebarMenuDataService: DashboardSidebarMenuDataService,
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
			.subscribe(result => { 
				this.habits = result.habits;
				
				if (this.habits.length) {
					this.selectHabit(this.habits[0]);
				}
			});
	}

	selectHabit(habit) {
		this.selectedHabit = habit;
		this.dashboardSidebarMenuDataService.setAction({
			name: 'habit selected',
			habit: this.selectedHabit
		});
	}

	openAddHabitModal(content: any) {
		this.actionType = "Add habit";
		this.resetEditHabitForm();
		this.editHabitModal = this.modalService.open(content);
	}

	resetEditHabitForm() {
		this.formSubmitted = false;
		this.editHabitForm.reset();
	}

	displayContextMenu(event: MouseEvent) {
		this.contextMenu.nativeElement.style.left = `${event.pageX}px`;
		this.contextMenu.nativeElement.style.top = `${event.pageY}px`;
		this.contextMenu.nativeElement.style.display = 'block';
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

	openEditHabitModal(content: any) {
		this.actionType = "Edit habit";
		this.resetEditHabitForm();
		this.editHabitForm.controls.name.setValue(this.selectedHabit.name);
		this.editHabitModal = this.modalService.open(content);
		this.contextMenu.nativeElement.style.display = 'none';
	}

	onEditHabit() {
		this.formSubmitted = true;
		if (this.editHabitForm.valid) {
			if (this.actionType == "Add habit") {
				this.addHabit();
			}
			else {
				this.editHabit();
			}
		}
	}

	addHabit() {
		this.habitService.createHabit(this.editHabitForm.value)
			.subscribe(
				() => {
					this.editHabitModal.close();
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

	editHabit() {
		this.habitService.editHabit(this.selectedHabit._id, this.editHabitForm.value)
			.subscribe(
				() => {
					this.editHabitModal.close();
					this.getAllHabits();
					const message = 'The habit was modified successfully'
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
