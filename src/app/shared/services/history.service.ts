import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getHabitHistory(habitId: any, filter: any) {
        let url = `${this.apiUrl}/history/${habitId}`;
        
        if (filter) {
            url += `?year=${filter.year}&month=${filter.month}`;
        }
        return this.http.get(url);
    }

    addDay(habitId: any, date: Date): Observable<any> {
        return this.http.post(`${this.apiUrl}/history/${habitId}`, { date: date });
    }

    deleteDay(habitId: any, date: Date): Observable<any> {
        return this.http.delete(`${this.apiUrl}/history/${habitId}/${date.toJSON()}`);
    }
}