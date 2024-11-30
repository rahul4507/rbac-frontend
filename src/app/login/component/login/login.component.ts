import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.message.success('Login successful!');
        localStorage.setItem('token', res.token); // Save token
        this.router.navigate(['/home']); // Navigate to the home page
      },
      error: (err) => {
        this.message.error('Login failed: ' + err.message);
      },
    });
  }
  // Method for cancel action (reset the form in this case)
  cancel(): void {
    this.loginForm.reset();  // Clears the form fields
    // Optionally, navigate to another page (e.g., home page)
    // this.router.navigate(['/home']);
  }
}
