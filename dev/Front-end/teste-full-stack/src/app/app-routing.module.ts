import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ClinicListComponent } from './pages/clinics/clinic-list/clinic-list.component';
import { ClinicFormComponent } from './pages/clinics/clinic-form/clinic-form.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { registerLocaleData } from '@angular/common';
import { ClinicViewComponent } from './pages/clinics/clinic-view/clinic-view.component';


const routes: Routes = [

  {
    path: 'login', component: LoginLayoutComponent, children: [
      { path: '', component: LoginLayoutComponent },
    ]
  },

  // Usuario
  {
    path: '', component: DefaultLayoutComponent, children: [
      {
        path: '', component: ClinicListComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'clinics/form', component: ClinicFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'clinics/form/:id', component: ClinicFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'clinics/view/:id', component: ClinicViewComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

const ENABLE_TRACING = false;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: ENABLE_TRACING,
    preloadingStrategy: PreloadAllModules,
  })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
