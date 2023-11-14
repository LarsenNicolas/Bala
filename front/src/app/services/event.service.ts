import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiEventos = 'http://localhost:3000/api/getEventos';
  private apiEvento = 'http://localhost:3000/api/getEvento';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get<any>(this.apiEventos);
  }

  getEvento(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEvento}/${id}`);
  }
}
