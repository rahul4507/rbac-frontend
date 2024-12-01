import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLoading$ = this.loadingService.isLoading$;
  isLoginPage: boolean = false; // To check if the user is on login or empty page
  SIDENAV_ITEMS: any = [
    {
      label: 'Home',
      iconName: 'home',
      link: '/home',
      child: []
    },
    {
      label: 'About',
      iconName: 'info-circle',
      link: '/about',
      child: [
        { label: 'Project', link: '/about/project', iconName: 'project' },
        { label: 'Developer', link: '/about/developer', iconName: 'code' },
        { label: 'Tech Stack Used', link: '/about/tech', iconName: 'tool' }
      ]
    },
    {
      label: 'Users',
      iconName: 'user',
      link: '/users',
      child: [
        { label: 'Manage Users', link: '/users/manage', iconName: 'team' },
        { label: 'Add User', link: '/users/add', iconName: 'user-add' }
      ]
    },
    {
      label: 'Roles',
      iconName: 'key',
      link: '/roles',
      child: [
        { label: 'Manage Roles', link: '/roles/manage', iconName: 'lock' },
        { label: 'Add Role', link: '/roles/add', iconName: 'plus-square' }
      ]
    },
  ];

  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if the current route is the login or empty page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.isLoginPage = currentUrl === '/login' || currentUrl === '/user' || currentUrl === "/admin-register";
      }
    });

    // Redirect the user after login based on their role (if authenticated)
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser); // Parse the stored user object

        if (user?.type === 'Admin') {
          this.router.navigate(['/home']);
        } else if (user?.type === 'User') {
          this.router.navigate(['/user']); // Redirect to empty page for users
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user'); // Clear invalid user data
      }
    }
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
