import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isCollapsed = false;
  isLoading$ = this.loadingService.isLoading$;
  isLoginPage: boolean = false;  // To check if user is on login page
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
    private router: Router,
    private authService: AuthService,  // Assuming you have an AuthService for handling user login and roles
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Check if the current route is login page
    this.route.url.subscribe(url => {
      this.isLoginPage = url[0]?.path === 'login';  // Adjust based on your route setup
    });

    // Redirect the user after login based on their role (if authenticated)
    this.authService.user$.subscribe(user => {
      if (user) {
        if (user.type === 'Admin') {
          this.router.navigate(['/home']);
        } else if (user.type === 'User') {
          this.router.navigate(['/welcome-user']);
        }
      }
    });
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
