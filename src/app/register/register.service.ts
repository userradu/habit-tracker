import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    register(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/signup`;
        return this.http.post<any>(url, data);
    }

    checkEmailNotTaken(email: string): Observable<any> {
        const url = `${this.apiUrl}/users/checkEmailNotTaken`;
        return this.http.post<any>(url, { email: email });
    }
}