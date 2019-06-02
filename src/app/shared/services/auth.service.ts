import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(email: string, password: string) {
        const url = `${this.apiUrl}/auth/login`;
        const data = {
            email: email,
            password: password
        };
        return this.http.post<any>(url, data)
            .pipe(
                map(response => {
                    this.saveAccessToken(response.token);
                    this.saveUserEmail(email);
                    return response.token;
                })
            );
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userEmail');
        this.router.navigate(['/login']);
    }

    saveAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    saveUserEmail(email: string) {
        localStorage.setItem('userEmail', email);
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    getUserEmail() {
        return localStorage.getItem('userEmail');
    }

    isLoggedIn() {
        return this.getAccessToken() != null;
    }

}