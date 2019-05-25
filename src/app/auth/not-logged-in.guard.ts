import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate, CanLoad {

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		return this.isNotLoggedIn();
	}

	canLoad(route: Route): boolean {
		return this.isNotLoggedIn();
	}

	isNotLoggedIn(): boolean {
		if (!this.authService.isLoggedIn()) {
			return true;
		}

		this.router.navigate(['/dashboard']);
		return false;
	}
}
