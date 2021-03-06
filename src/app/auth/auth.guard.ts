import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private router: Router,
		private authService: AuthService
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.checkLogin();
	}

	canLoad(route: Route): boolean {
		return this.checkLogin();
	}

	checkLogin(): boolean {
		if (this.authService.isLoggedIn()) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
