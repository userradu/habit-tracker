import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { CheckEmailExistsValidator } from './custom-validation-rules/check-email-exists.directive';
import { CheckEmailService } from 'src/app/shared/services/check-email.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
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
export class ForgotPasswordComponent implements OnInit {

	forgotPasswordForm = this.fb.group({
		email: [
			'', 
			[Validators.required, Validators.email],
			CheckEmailExistsValidator.createValidator(this.checkEmailService)
		],
	});

	formSubmitted: boolean = false;
	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router,
		private forgotPasswordService: ForgotPasswordService,
		private checkEmailService: CheckEmailService,
		private authService: AuthService
	) {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/dashboard'])
		}
	 }

	ngOnInit() {
	}

	get email() {
		return this.forgotPasswordForm.get('email');
	}

	onSubmit() {

		this.formSubmitted = true;

		if (this.forgotPasswordForm.valid) {
			this.loading = true;

			this.forgotPasswordService.sendResetPasswordEmail(this.email.value)
				.subscribe(() => {
					this.loading = false;
					const message = `A reset password email was sent to ${this.email.value}`;
					this.toastr.success('', message, {
						closeButton: true,
						timeOut: 0
					});
					this.router.navigate(['/login']);
				})
		}
	}
}
