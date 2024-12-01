import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleManageComponent } from './components/module.manage/module.manage.component';
import { ModuleAddComponent } from './components/module.add/module.add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/manage'
  },
  {
    path: 'manage',
    component: ModuleManageComponent
  },
  {
    path: 'add',
    component: ModuleAddComponent
  },
  {
    path: 'edit/:moduleId',
    component: ModuleAddComponent
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModuleRoutingModule { }
