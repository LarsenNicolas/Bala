import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, credentials);
  }

  getUsername(): string | null {
    // Obtiene el nombre de usuario guardado
    return localStorage.getItem('username');
  }

  setUsername(username: string): void {
    // Guarda el nombre de usuario en el servicio
    localStorage.setItem('username', username);
  }
}
