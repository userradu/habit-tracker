import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CheckEmailService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    checkEmailExists(email: string): Observable<any> {
        const url = `${this.apiUrl}/users/checkEmailExists`;
        return this.http.post<any>(url, { email: email });
    }
}