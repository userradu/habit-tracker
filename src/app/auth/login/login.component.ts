import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { ParseServerErrorsService } from 'src/app/shared/services/parse-server-errors.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	formSubmitted: boolean = false;
	loading: boolean = false;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authService: AuthService,
		private toastr: ToastrService,
		private parseServerErrorsService: ParseServerErrorsService
	) { 
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/dashboard'])
		}
	}

	ngOnInit() {
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	onSubmit() {

		this.formSubmitted = true;

		if (this.loginForm.valid) {
			this.loading = true;

			this.authService.login(this.email.value, this.password.value)
				.subscribe(
					() => {
						this.loading = false;
						this.router.navigate(['/dashboard']);
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
