import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './core/components/page.not.found/page.not.found.component';
import { LoginComponent } from './login/component/login/login.component'; // Import the login component
// import { AuthGuard } from './core/guards/auth.guard'; // Import the AuthGuard if applicable

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' }, // Redirect to login by default
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard] // Protect the route (optional, if authentication is implemented)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    // canActivate: [AuthGuard] // Protect the route (optional)
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    // canActivate: [AuthGuard] // Protect the route (optional)
  },
  {
    path: 'roles',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
    // canActivate: [AuthGuard] // Protect the route (optional)
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
