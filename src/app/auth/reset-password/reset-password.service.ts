import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    resetPassword(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/forgot-password/reset`;
        return this.http.post<any>(url, data);
    }
}