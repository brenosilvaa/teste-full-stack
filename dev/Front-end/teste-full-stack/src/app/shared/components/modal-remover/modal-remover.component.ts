import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';

interface ModalData {
  mensagem: string;
  complemento: string;
}

@Component({
  selector: 'app-modal-remover',
  templateUrl: './modal-remover.component.html',
})
export class ModalRemoverComponent implements OnInit {

  @Input() title: string;

  constructor(
    public _dialogRef: MatDialogRef<ModalRemoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) { }

  ngOnInit() {
  }

  onClick(): void {
    this._dialogRef.close();
  }
  
  cancelar(){
    this._dialogRef.close();
  }
}
