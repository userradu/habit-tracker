import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { confirmPasswordValidation } from 'src/app/shared/directives/custom-validation-rules/confirm-password.directive';
import { ParseServerErrorsService } from 'src/app/shared/services/parse-server-errors.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['../../shared/css/auth.css'],
	animations: [
		trigger('fadeInOut', [
			state('void', style({
				opacity: 0
			})),
			transition('void <=> *', animate('0.4s ease-in')),
		])
	]
})
export class ResetPasswordComponent implements OnInit {

	passwordMinLength = 6;

	resetPasswordForm = this.fb.group({
		password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
		confirmPassword: ['', Validators.required],
		email: [this.route.snapshot.queryParamMap.get('email')],
		token: [this.route.snapshot.queryParamMap.get('token')]
	}, { validators: confirmPasswordValidation });

	formSubmitted: boolean = false;
	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router,
		private route: ActivatedRoute,
		private resetPasswordService: ResetPasswordService,
		private parseServerErrorsService: ParseServerErrorsService,
		private authService: AuthService
	) {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/dashboard'])
		}
	 }

	ngOnInit() {
	}

	get password() {
		return this.resetPasswordForm.get('password');
	}

	get confirmPassword() {
		return this.resetPasswordForm.get('confirmPassword');
	}

	onSubmit() {

		this.formSubmitted = true;

		if (this.resetPasswordForm.valid) {
			this.loading = true;

			this.resetPasswordService.resetPassword(this.resetPasswordForm.value)
				.subscribe(
					() => {
						this.loading = false;
						const message = 'The password was successfully changed'
						this.toastr.success('', message, {
							closeButton: true,
							timeOut: 0
						});
						this.router.navigate(['/login']);
					},
					(response) => {
						this.loading = false;
						let error = this.parseServerErrorsService.parseError(response.error);
						this.toastr.error('', error, {
							closeButton: true,
							timeOut: 0
						});
					}
				);
		}
	}

}
