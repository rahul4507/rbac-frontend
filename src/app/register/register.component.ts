import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '.././core/services/admin-register.service'; // Update the path as necessary

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: RegisterService,  // Make sure the service handles API calls
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name should be at least 3 characters
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid format
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Phone should be a 10-digit number
      date_of_birth: ['', Validators.required], // Date of birth is required
      password: ['', [Validators.required, Validators.minLength(6)]], // Password should be at least 6 characters
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]], // Confirm password should be at least 6 characters
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // Submit form
  submitRegister() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const { name, email,phone,date_of_birth, password, confirmPassword } = this.registerForm.value;

    // Ensure both passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      this.isLoading = false;
      return;
    }

    // Call the user service to handle registration API
    this.userService.register( { name, email, phone, date_of_birth, password }).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.isLoading = false;
      }
    );
  }
}
