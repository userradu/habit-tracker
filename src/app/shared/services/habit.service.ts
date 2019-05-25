import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HabitService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    createHabit(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/habits`, data);
    }
}