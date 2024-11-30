import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
   * Logs in a user with the provided credentials.
   * @param credentials The user credentials (email and password).
   * @returns Observable of the login response.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs out the currently authenticated user.
   * @returns Observable of the logout response.
   */
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {})
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves the currently authenticated user's profile.
   * @returns Observable of the user's profile data.
   */
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`)
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
