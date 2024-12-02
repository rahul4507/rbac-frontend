import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { IconsProviderModule } from './icons-provider.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgZorroModule } from './ngzorro.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // Import this module
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar'; // Import NzAvatarModule
import { NzMenuModule } from 'ng-zorro-antd/menu'; // Import NzMenuModule
import { HttpInterceptorService } from './core/interceptors/api.interceptor';
import { LoginComponent } from './login/component/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModuleAddComponent } from './modules/components/module.add/module.add.component';
import { ModuleManageComponent } from './modules/components/module.manage/module.manage.component';
import { UserDashboardComponent } from './user.dashboard/user.dashboard.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModuleAddComponent,
    ModuleManageComponent,
    UserDashboardComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    CoreModule,
    NgZorroModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzPopoverModule,
    NzMenuModule,
    NzAvatarModule,
  ],

  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
