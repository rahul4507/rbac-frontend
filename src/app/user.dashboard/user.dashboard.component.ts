import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role/services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  userName = '';
  modules: any = [];

  constructor(private RoleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    let storedUser: any = localStorage.getItem('user');
    storedUser = JSON.parse(storedUser)
    this.userName = storedUser.name
    
    this.RoleService.getRoleById(storedUser.role).subscribe(
      (data) => {
        this.modules = data.data.role.modules_details;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
