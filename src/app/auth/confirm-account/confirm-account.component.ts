import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-confirm-account',
	templateUrl: './confirm-account.component.html',
	styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

	loading: boolean = true;
	errorMessage: string;

	constructor(
		private registerService: RegisterService,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		private router: Router,
		private authService: AuthService
	) {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/dashboard'])
		}
	 }

	ngOnInit() {
		
		const verificationToken = this.route.snapshot.paramMap.get('verificationToken');

		this.registerService.confirmAccount(verificationToken)
			.subscribe(
				() => {
					const message = 'Your account has been activated successfully. You can now login.'
					this.toastr.success('', message, {
						closeButton: true,
						timeOut: 0
					});
					this.router.navigate(['/login']);
				},
				() => {
					this.loading = false;
					this.errorMessage = "Could not complete signup - the email address was not verified";
				}
			)
	}

}