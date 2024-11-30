import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';  // Import AuthService

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  
  constructor(private loadingService: LoadingService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show the loading spinner before making the request
    this.loadingService.show();

    // Get the token from AuthService
    const token = localStorage.getItem('token');
    let modifiedReq = req;

    // If a user is logged in and has a token, add it to the request headers
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Add the token to Authorization header
        }
      });
    }

    // Continue with the request
    return next.handle(modifiedReq).pipe(
      finalize(() => {
        // Hide the loading spinner after request is complete
        this.loadingService.hide();
      })
    );
  }
}
