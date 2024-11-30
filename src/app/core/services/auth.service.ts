import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../.././user.model';  // The User model from above

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.checkUserSession();  // Check if user is logged in when app initializes
  }

  // Check if user session exists in localStorage
  checkUserSession() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      this.userSubject.next(user);  // Set the user data in the BehaviorSubject if valid
    }
  }

  // Login method to authenticate and save user details
  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));  // Store user in localStorage
    this.userSubject.next(user);  // Emit the user data via BehaviorSubject
  }

  // Logout method to clear user session
  logout() {
    localStorage.removeItem('user');  // Remove user from localStorage
    this.userSubject.next(null);  // Emit null to clear the BehaviorSubject
  }
}
