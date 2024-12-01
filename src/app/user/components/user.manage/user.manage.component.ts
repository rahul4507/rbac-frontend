import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user.manage.component.html',
})
export class UserManageComponent {
  users: any = [];
  searchData: string = '';
  blocks: any = [
    'Name',
    'Email',
    'Phone',
    'DOB',
    'Role',
    'Modules',
    'Status',
    'Created Date',
    'Action'
  ];

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.userService.getUsers().subscribe((data: any) => {
      // Transform the data before storing it in 'users'
      this.users = data.data.users.map((user: any) => ({
        ...user,
        role_name: user.role?.name, // Extracting role name
        modules: user.role?.modules.map((module: any) => module.name).join(', '), // Joining module names
        date_of_birth: new Date(user.date_of_birth), // Format date if needed
        createdAt: new Date(user.createdAt), // Format created date if needed
      }));
    });
  }

  search(): void {
    if (this.searchData === '') {
      this.getList();
      return;
    }
    this.userService.searchUser(this.searchData).subscribe((result: any) => {
      this.users = result.data.users.map((user: any) => ({
        ...user,
        role_name: user.role?.name,
        modules: user.role?.modules.map((module: any) => module.name).join(', '),
        date_of_birth: new Date(user.date_of_birth),
        createdAt: new Date(user.createdAt),
      }));
    });
  }

  confirmDelete(item: any): void {
    this.userService.deleteUser(item._id).subscribe({
      next: (res: any) => {
        this.message.success('User deleted successfully');
        this.getList();
      },
      error: (err: any) => this.message.error('Failed to delete user: ' + err.message),
    });
  }
}
