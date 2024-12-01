import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroModule } from '../ngzorro.module';
import { SharedModule } from '../shared/shared.module';
import { ModuleManageComponent } from './components/module.manage/module.manage.component'; // Assuming module management component
import { ModuleAddComponent } from './components/module.add/module.add.component'; // Assuming module adding component
import {ModuleRoutingModule} from './modules-routing.module'
import { ReactiveFormsModule } from '@angular/forms'; // Reactive forms module if needed

@NgModule({
  declarations: [
  ],

  imports: [
    FormsModule, // For template-driven forms
    ReactiveFormsModule, // For reactive forms (if you're using them)
    SharedModule, // Shared components or services
    NgZorroModule, // Include NgZorro for UI components
    CommonModule, // Basic Angular functionalities
    ModuleRoutingModule,
  ]
})
export class ModulesModule { }
