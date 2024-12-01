import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make API calls
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeMenu = 'home'; // Track active menu
  loggedInUser: any = {}; // Store logged-in user data

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the logged-in user from localStorage or API call
    this.loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  navigate(route: string): void {
    this.activeMenu = route;
    this.router.navigate([route]);
  }

  logout(): void {
    // Call the logout API
    this.http.post(`${environment.API_URL}/api/v1/auth/logout`, {}).subscribe(
      () => {
        // On success, clear user data from localStorage and redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle any error that occurs during the API call
        console.error('Logout failed', error);
        // Optionally show a message or alert to the user
      }
    );
  }
}
