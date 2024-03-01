import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicListComponent } from './pages/clinics/clinic-list/clinic-list.component';
import localePt from '@angular/common/locales/pt';
import { ClinicFormComponent } from './pages/clinics/clinic-form/clinic-form.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ModalRemoverComponent } from './shared/components/modal-remover/modal-remover.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ClinicViewComponent } from './pages/clinics/clinic-view/clinic-view.component';

registerLocaleData(localePt);

export const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },

  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    DefaultLayoutComponent,
    ClinicListComponent,
    ClinicViewComponent,
    ClinicFormComponent,
    ModalRemoverComponent
  ],
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-Br' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
    { provide: LOCALE_ID, useValue: 'pt-Br' },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
