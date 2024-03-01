import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent implements OnInit {
  form: FormGroup;
  isBusy: boolean = false;
  isSubmit: boolean = false;
  isPassword: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _service: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  onSubmit() {
    this.isSubmit = true;

    let form = this.form?.getRawValue();

    if (this._service.login(form.email, form.password)) {
      // Login bem-sucedido, redirecione para a página desejada
      this._router.navigate(['',])
      this._snackBar.open(`Bem vindo!`, 'Fechar');
      this.isSubmit = false;
    } else {
      // Login falhou, exiba uma mensagem de erro ou tome a ação adequada
      console.log('Login falhou');
      this._snackBar.open(`Erro! E-mail ou senha incorretos!`, 'Fechar');
      this.isSubmit = false;
    }

  }

}


