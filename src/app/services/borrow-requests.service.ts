import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BorrowRequestsService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getAllBorrowRequests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/borrow-requests`);
  }
}
