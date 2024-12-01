import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user.add.component.html',
})

export class UserAddComponent {
  userId: string = '';
  operation = 'Add';
  btnName = 'Add User';
  userForm!: FormGroup;
  roles: any[] = [];
  adminEmail: string=''; // Get masterEmail from localStorage
  password: string=''; 
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Retrieve admin user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const admin = JSON.parse(storedUser);
      this.adminEmail = admin.email;  // Extract admin's email
    }
    this.userId = this.route.snapshot.paramMap.get('userId') || '';

    if (this.userId) {
      this.operation = 'Edit';
      this.btnName = 'Update User';
      this.userService.getUserById(this.userId).subscribe({
        next: (res: any) => {
          this.userForm.patchValue(res.data.user);
        },
        error: (err: any) => this.message.error('Failed to fetch user: ' + err.message),
      });
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getRoles();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        { value: '', disabled: this.operation === 'Edit' }, 
        [Validators.required, Validators.email],
      ], 
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      date_of_birth: ['', Validators.required],
      role: ['', Validators.required],
      is_active: [true],
      masterEmail: [this.adminEmail, Validators.required],
      password: [this.password, Validators.required] // Add masterEmail to the form
    });
  }

  getRoles(): void {
    this.userService.getActiveRoles().subscribe({
      next: (res: any) => (this.roles = res.data.roles),
      error: (err) => this.message.error('Failed to fetch roles: ' + err.message),
    });
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    // Ensure masterEmail is added before sending to the server
    const formData = { ...this.userForm.value, masterEmail: this.adminEmail };

    switch (this.operation) {
      case 'Add':
        this.userService.createUser(formData).subscribe({
          next: () => {
            this.userForm.reset();
            this.message.success('User created successfully');
          },
          error: (err) => {
            this.message.error('Failed to create user: ' + err.message);
          },
        });
        break;

      case 'Edit':
        this.userService.updateUser(this.userId, formData).subscribe({
          next: () => {
            this.router.navigate(['/users/manage']);
            this.message.success('User updated successfully');
          },
          error: (err) => {
            this.message.error('Failed to update user: ' + err.message);
          },
        });
        break;
    }
  }

  cancel(): void {
    window.location.reload();
  }

  getTitle(): string {
    return this.operation === 'Add' ? 'Add User' : 'Update User';
  }
}
