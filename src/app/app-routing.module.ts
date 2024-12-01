import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './core/components/page.not.found/page.not.found.component';
import { LoginComponent } from './login/component/login/login.component'; 
import { RegisterComponent } from './register/register.component'; 
import { ModuleAddComponent } from './modules/components/module.add/module.add.component';
import { ModuleManageComponent } from './modules/components/module.manage/module.manage.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' }, // Redirect to login by default
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin-register', component: RegisterComponent 
  }
  ,
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
  },
  {
    path: 'modules' ,
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
