import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/models/clinic.model';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrl: './clinic-view.component.scss'
})
export class ClinicViewComponent {
  title: string = "Detalhes da clínica"
  id: number;

  isLoading: boolean = false;


  clinic: Clinic;

  constructor(
    private _router: Router,
    private _service: ClinicService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let id = this._route.snapshot.params['id'];
    this.id = id;

    this.isLoading = true


    if (id) {
      this._service
        .find(id)
        .subscribe((clinic: any) => {
          this.clinic = clinic.data

          this.isLoading = false;
        },
          error => {
            this.isLoading = false;
            if (error.error.message) {
              this._snackBar.open(`${error.error.statusCode} - ${error.error.message}`, 'Fechar');
            } else {
              this._snackBar.open('Ops! Algo deu errado. Por favor, tente novamente mais tarde.', 'Fechar');
            }
          });
    }
    this.isLoading = false;
  }


  select(id: number) {
    this._router.navigate(['/clinics', 'form', id]);
  }

  back() {
    this._router.navigate(['/clinics']);
  }
}
