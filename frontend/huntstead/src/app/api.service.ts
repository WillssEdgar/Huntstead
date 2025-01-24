import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/data`);
  }

  postData(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/data`, payload);
  }


  signUp(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sign-up`, payload);
  }
}
