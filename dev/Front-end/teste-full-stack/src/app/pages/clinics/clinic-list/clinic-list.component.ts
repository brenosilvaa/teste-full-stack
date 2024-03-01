import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Clinic } from 'src/app/models/clinic.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicService } from 'src/app/services/clinic.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrl: './clinic-list.component.scss'
})
export class ClinicListComponent {
  title: string = "Clínicas"
  noDataFound: boolean = false;

  clinics: Clinic[] = [];
  isLoading: boolean = false;

  dataSource = new MatTableDataSource<Clinic>();
  displayedColumns: string[] = ['businessName', 'tradeName', 'cnpj', 'region', 'inaugurationDate', 'isActive', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  searchControl = new FormControl('');

  constructor(
    private _router: Router,
    private _service: ClinicService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this._service
      .list()
      .subscribe((clinics: any) => {
        this.clinics = clinics.data;
        this.isLoading = false;

        this.dataSource = new MatTableDataSource(this.clinics);

        this.searchControl.valueChanges.pipe(
          debounceTime(300), // 300 milissegundos de atraso após a última alteração
          distinctUntilChanged() // Apenas emite se o valor for diferente do valor anterior
        ).subscribe(value => {
          this.applyFilter(value);
        });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data: Clinic, column: string) => {
          switch (column) {
            case 'businessName':
              return data.businessName.toLowerCase();
            case 'tradeName':
              return data.tradeName.toLowerCase();
            case 'cnpj':
              return data.cnpj;
            case 'region':
              return data.region.toLowerCase();
            case 'isActive':
              return data.isActive ? 1 : 0;
            case 'inaugurationDate':
              return moment(data.inaugurationDate).unix();
            default:
              return null;
          }
        }

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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  clearSearch() {
    this.searchControl.setValue('');  // Limpa o valor do controle de pesquisa
  }

  select(id: number) {
    this._router.navigate(['/clinics', 'form', id]);
  }

  view(id: number) {
    this._router.navigate(['/clinics', 'view', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.noDataFound = this.dataSource.filteredData.length === 0;
  }

  logout() {
    this._authService.logout();

    this._router.navigate(['/login']);
  }
}
