import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidation } from './confirm-password.directive';
import { transition, trigger, style, animate, state } from '@angular/animations';

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
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
		confirmPassword: ['', Validators.required]
	}, { validators: confirmPasswordValidation });

	formSubmitted: boolean = false;

	constructor(private fb: FormBuilder) { }

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
			console.log('form valid');
		}
	}
}
