import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-module-manage',
  templateUrl: './module.manage.component.html',
})
export class ModuleManageComponent implements OnInit {
  modules: any[] = [];  // Array to hold modules
  searchData: string = '';  // Variable to hold the search input

  tableColumns: string[] = ['Name', 'Status', 'Description', 'Created At', 'Actions'];

  constructor(
    private moduleService: ModuleService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadModules(); // Call loadModules on initialization
  }

  loadModules(): void {
    this.moduleService.getModules().subscribe({
      next: (res: any) => {
        // Accessing modules from the response data
        this.modules = res.data.modules; // Make sure to access modules under data
      },
      error: (err) => {
        this.message.error('Failed to load modules: ' + err.message);
      },
    });
  }

  confirmDelete(module: any): void {
    this.deleteModule(module._id);  // Pass the module ID to delete
  }

  deleteModule(moduleId: string): void {
    this.moduleService.deleteModule(moduleId).subscribe({
      next: () => {
        this.modules = this.modules.filter((module) => module._id !== moduleId); // Remove deleted module
        this.message.success('Module deleted successfully');
      },
      error: (err) => {
        this.message.error('Failed to delete module: ' + err.message);
      },
    });
  }

  search(): void {
    if (this.searchData.trim()) {
      this.modules = this.modules.filter((module) =>
        module.name.toLowerCase().includes(this.searchData.toLowerCase()) // Search by module name
      );
    } else {
      this.loadModules();  // Reload modules if search data is empty
    }
  }
}
