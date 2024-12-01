import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-add',
  templateUrl: './module.add.component.html',
})
export class ModuleAddComponent implements OnInit {
  moduleForm!: FormGroup; // Define the form group

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form when component loads
  }

  // Initialize the form with validation rules
  initializeForm(): void {
    this.moduleForm = this.fb.group({
      name: ['', [Validators.required]], // Name is required
      description: ['', [Validators.maxLength(500)]], // Optional description with max length validation
    });
  }

  // Handle form submission
  submitForm(): void {
    if (this.moduleForm.invalid) {
      Object.values(this.moduleForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty(); // Mark as dirty to trigger validation UI changes
          control.updateValueAndValidity({ onlySelf: true }); // Trigger value and validity update
        }
      });
      return; // Stop further execution if form is invalid
    }

    // Submit data to create module
    this.moduleService.createModule(this.moduleForm.value).subscribe({
      next: () => {
        this.moduleForm.reset(); // Reset the form on success
        this.message.success('Module created successfully'); // Show success message
        this.router.navigate(['/modules/manage']); // Navigate to manage modules page
      },
      error: (err) => {
        this.message.error('Failed to create module: ' + err.message); // Show error message on failure
      },
    });
  }

  // Handle form cancellation
  cancel(): void {
    this.router.navigate(['/modules/manage']); // Navigate to manage modules page
  }
}
