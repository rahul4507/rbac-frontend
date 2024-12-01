import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly API_CONFIG = {
    baseUrl: environment.API_URL,
    version: 'v1',
    endpoint: 'auth'
  } as const;

  private get apiUrl(): string {
    return `${this.API_CONFIG.baseUrl}/api/${this.API_CONFIG.version}/${this.API_CONFIG.endpoint}`;
  }

  constructor(private readonly http: HttpClient) { }

  /**
   * Registers a new user with the provided information.
   * @param user The user information (username, email, password).
   * @returns Observable of the registration response.
   */
  register(user: { name: string; email: string; phone: string; date_of_birth: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-admin`, user)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors.
   * @param error The error response.
   * @returns Observable that throws an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
