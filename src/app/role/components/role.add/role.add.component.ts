import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../modules/services/module.service'; // Add ModuleService for fetching modules

@Component({
  selector: 'app-role-add',
  templateUrl: './role.add.component.html',
})
export class RoleAddComponent implements OnInit {
  roleId: string = '';
  operation = 'Add';
  btnName = 'Add Role';
  roleForm!: FormGroup;
  modules: any[] = []; // Modules to be populated from API

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private moduleService: ModuleService, // Inject ModuleService
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roleId = this.route.snapshot.paramMap.get('roleId') || '';
  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchModules(); // Fetch modules on component initialization
    if (this.roleId) {
      this.operation = 'Edit';
      this.btnName = 'Update Role';
      this.roleService.getRoleById(this.roleId).subscribe({
        next: (res: any) => {
          this.roleForm.patchValue(res.data.role);
        },
        error: (err: any) => this.message.error('Failed to fetch role: ' + err.message),
      });
    }
  }

  // Fetch modules from the API
  fetchModules(): void {
    this.moduleService.getModules().subscribe({
      next: (res: any) => {
        this.modules = res.data.modules || []; // Assuming the API response has a 'data' field with module info
      },
      error: (err: any) => {
        this.message.error('Failed to fetch modules: ' + err.message);
      }
    });
  }

  initializeForm(): void {
    this.roleForm = this.fb.group({
      name: [
        { value: '', disabled: this.operation === 'Edit' },
        [Validators.required, Validators.minLength(3)],
      ],
      role: ['', [Validators.required, Validators.minLength(3)]],
      is_active: [true],
      modules: [[], Validators.required], // Bind the modules as a multi-select
      description: [''], // Added description field for the role
    });
  }

  submitForm(): void {
    if (this.roleForm.invalid) {
      Object.values(this.roleForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    // Prepare the payload with the selected module IDs
    const formValue = { 
      ...this.roleForm.value,
      modules: this.roleForm.value.modules.map((moduleId: any) => ( moduleId )) // Map the selected module IDs
    };

    switch (this.operation) {
      case 'Add':
        this.roleService.createRole(formValue).subscribe({
          next: () => {
            this.roleForm.reset();
            this.message.success('Role created successfully');
          },
          error: (err) => {
            this.message.error('Failed to create role: ' + err.message);
          }
        });
        break;

      case 'Edit':
        this.roleService.updateRole(this.roleId, formValue).subscribe({
          next: () => {
            this.router.navigate(['/roles/manage']);
            this.message.success('Role updated successfully');
          },
          error: (err) => {
            this.message.error('Failed to update role: ' + err.message);
          }
        });
        break;
    }
  }

  cancel(): void {
    window.location.reload();
  }

  getTitle(): string {
    return this.operation === 'Add' ? 'Add Role' : 'Update Role';
  }
}
