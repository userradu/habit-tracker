import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidation } from './custom-validation-rules/confirm-password.directive';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { RegisterService } from './register.service';
import { CheckEmailNotTakenValidator } from './custom-validation-rules/check-email-not-taken.directive';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../shared/css/access.css', './register.component.css'],
	animations: [
		trigger('fadeInOut', [
			state('void', style({
				opacity: 0
			})),
			transition('void <=> *', animate('0.4s ease-in')),
		])
	]
})
export class RegisterComponent implements OnInit {

	passwordMinLength = 6;

	registerForm = this.fb.group({
		email: [
			'',
			[Validators.required, Validators.email],
			CheckEmailNotTakenValidator.createValidator(this.registerService)
		],
		password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
		confirmPassword: ['', Validators.required]
	}, { validators: confirmPasswordValidation });

	formSubmitted: boolean = false;
	loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private registerService: RegisterService,
		private toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit() { }

	get email() {
		return this.registerForm.get('email');
	}

	get password() {
		return this.registerForm.get('password');
	}

	get confirmPassword() {
		return this.registerForm.get('confirmPassword');
	}

	onSubmit() {

		this.formSubmitted = true;

		if (this.registerForm.valid) {
			this.loading = true;

			this.registerService.register(this.registerForm.value)
				.subscribe(() => {
					this.loading = false;
					const message = `A confirmation email was sent to ${this.email.value}`
					this.toastr.success('', message, {
						closeButton: true,
						timeOut: 0
					});
					this.router.navigate(['/login']);
				});
		}
	}
}
