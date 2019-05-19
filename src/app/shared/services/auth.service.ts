import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
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
                    return response.token;
                })
            );
    }

    saveAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

}