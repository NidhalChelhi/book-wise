import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(user: any): Observable<any> {
    console.log(`${this.apiUrl}/users`);
    console.log('user from service:', user);
    return this.http.post(`${this.apiUrl}/users`, user);
  }
}
