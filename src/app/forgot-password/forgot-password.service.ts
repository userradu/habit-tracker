import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    sendResetPasswordEmail(email: string): Observable<any> {
        const url = `${this.apiUrl}/auth/forgot-password`;
        return this.http.post<any>(url, { email: email });
    }

}