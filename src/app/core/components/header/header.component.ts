import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeMenu = 'home'; // Track active menu

  constructor(private router: Router) {}

  navigate(route: string): void {
    this.activeMenu = route;
    this.router.navigate([route]);
  }
}
