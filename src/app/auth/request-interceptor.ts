import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		const accessToken = this.authService.getAccessToken();

		if (accessToken) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`
				}
			})
		}

		return next.handle(req);
	}
}
