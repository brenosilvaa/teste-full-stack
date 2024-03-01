import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic, Region } from 'src/app/models/clinic.model';
import { ClinicService } from 'src/app/services/clinic.service';
import { ModalRemoverComponent } from 'src/app/shared/components/modal-remover/modal-remover.component';




@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrl: './clinic-form.component.scss'
})
export class ClinicFormComponent {
  title: string = "Clínica"

  // Especialidades Médicas
  medicalSpecialties = [
    { label: 'Acupuntura', value: 'Acupuntura' },
    { label: 'Agente Comunitário de Saúde', value: 'Agente Comunitário de Saúde' },
    { label: 'Alergia e Imunologia', value: 'Alergia e Imunologia' },
    { label: 'Anatomopatologista', value: 'Anatomopatologista' },
    { label: 'Anestesiologista', value: 'Anestesiologista' },
    { label: 'Angiologia', value: 'Angiologia' },
    { label: 'Assistente Social', value: 'Assistente Social' },
    { label: 'Atendente de Consultório Dentário', value: 'Atendente de Consultório Dentário' },
    { label: 'Auxiliar de Enfermagem', value: 'Auxiliar de Enfermagem' },
    { label: 'Auxiliar de Farmácia de Manipulação', value: 'Auxiliar de Farmácia de Manipulação' },
    { label: 'Auxiliar de Laboratório de Análises Clínicas', value: 'Auxiliar de Laboratório de Análises Clínicas' },
    { label: 'Auxiliar de Radiologia (Revelação Fotográfica)', value: 'Auxiliar de Radiologia (Revelação Fotográfica)' },
    { label: 'Auxiliar em Saúde Bucal da Estratégia de Saúde da Família', value: 'Auxiliar em Saúde Bucal da Estratégia de Saúde da Família' },
    { label: 'Auxiliar Técnico em Patologia Clínica', value: 'Auxiliar Técnico em Patologia Clínica' },
    { label: 'Biologo', value: 'Biologo' },
    { label: 'Biomédico', value: 'Biomédico' },
    { label: 'Cancerologista Cirúrgico (Oncologista Cirúrgico)', value: 'Cancerologista Cirúrgico (Oncologista Cirúrgico)' },
    { label: 'Cardiologia', value: 'Cardiologia' },
    { label: 'Cirurgia Cardiovascular', value: 'Cirurgia Cardiovascular' },
    { label: 'Cirurgia da Mão', value: 'Cirurgia da Mão' },
    { label: 'Cirurgia de Cabeça e Pescoço', value: 'Cirurgia de Cabeça e Pescoço' },
    { label: 'Cirurgia do Aparelho Digestivo', value: 'Cirurgia do Aparelho Digestivo' },
    { label: 'Cirurgia Geral', value: 'Cirurgia Geral' },
    { label: 'Cirurgia Pediátrica', value: 'Cirurgia Pediátrica' },
    { label: 'Cirurgia Plástica', value: 'Cirurgia Plástica' },
    { label: 'Cirurgia Torácico', value: 'Cirurgia Torácico' },
    { label: 'Cirurgia Vascular', value: 'Cirurgia Vascular' },
    { label: 'Cirurgião Dentista - Clínico Geral', value: 'Cirurgião Dentista - Clínico Geral' },
    { label: 'Cirurgião Dentista - Dentística', value: 'Cirurgião Dentista - Dentística' },
    { label: 'Cirurgião Dentista - Endodontista', value: 'Cirurgião Dentista - Endodontista' },
    { label: 'Cirurgião Dentista - Estratégia Saúde da Família', value: 'Cirurgião Dentista - Estratégia Saúde da Família' },
    { label: 'Cirurgião Dentista - Ortopedista e Ortodontista', value: 'Cirurgião Dentista - Ortopedista e Ortodontista' },
    { label: 'Cirurgião Dentista - Patologista Bucal', value: 'Cirurgião Dentista - Patologista Bucal' },
    { label: 'Cirurgião Dentista - Radiologista', value: 'Cirurgião Dentista - Radiologista' },
    { label: 'Cirurgião Dentista - Traumatologista Bucomaxilofacial', value: 'Cirurgião Dentista - Traumatologista Bucomaxilofacial' },
    { label: 'Cirurgião Dentista de Saúde Coletiva', value: 'Cirurgião Dentista de Saúde Coletiva' },
    { label: 'Clínica Médica', value: 'Clínica Médica' },
    { label: 'Clínico Geral', value: 'Clínico Geral' },
    { label: 'Curso de Dependência Química', value: 'Curso de Dependência Química' },
    { label: 'Dermatologia', value: 'Dermatologia' },
    { label: 'Diretor de Serviços de Saúde', value: 'Diretor de Serviços de Saúde' },
    { label: 'Educador Físico', value: 'Educador Físico' },
    { label: 'Endocrinologia e Metabologia', value: 'Endocrinologia e Metabologia' },
    { label: 'Endoscopista', value: 'Endoscopista' },
    { label: 'Enfermeiro', value: 'Enfermeiro' },
    { label: 'Farmacêutico', value: 'Farmacêutico' },
    { label: 'Farmacêutico Bioquímico', value: 'Farmacêutico Bioquímico' },
    { label: 'Fisiatria', value: 'Fisiatria' },
    { label: 'Fisioterapeuta Esportivo', value: 'Fisioterapeuta Esportivo' },
    { label: 'Fisioterapeuta Geral', value: 'Fisioterapeuta Geral' },
    { label: 'Fonoaudiólogo', value: 'Fonoaudiólogo' },
    { label: 'Gastroenterologia', value: 'Gastroenterologia' },
    { label: 'Geneticista (Médico)', value: 'Geneticista (Médico)' },
    { label: 'Geriatra', value: 'Geriatra' },
    { label: 'Ginecologia e Obstetrícia', value: 'Ginecologia e Obstetrícia' },
    { label: 'Hematologia', value: 'Hematologia' },
    { label: 'Hemoterapeuta', value: 'Hemoterapeuta' },
    { label: 'Hiperbarista', value: 'Hiperbarista' },
    { label: 'Infectologista', value: 'Infectologista' },
    { label: 'Instrumentador Cirúrgico', value: 'Instrumentador Cirúrgico' },
    { label: 'Intensivista', value: 'Intensivista' },
    { label: 'Legista', value: 'Legista' },
    { label: 'Massagista', value: 'Massagista' },
    { label: 'Mastologista', value: 'Mastologista' },
    { label: 'Medicina Estética', value: 'Medicina Estética' },
    { label: 'Medicina Nuclear', value: 'Medicina Nuclear' },
    { label: 'Médico Coloproctologista', value: 'Médico Coloproctologista' },
    { label: 'Médico de Família e Comunidade', value: 'Médico de Família e Comunidade' },
    { label: 'Médico do Trabalho', value: 'Médico do Trabalho' },
    { label: 'Médico em Medicina de Tráfego', value: 'Médico em Medicina de Tráfego' },
    { label: 'Médico em Medicina Preventiva e Social', value: 'Médico em Medicina Preventiva e Social' },
    { label: 'Médico Estratégia Saúde da Família', value: 'Médico Estratégia Saúde da Família' },
    { label: 'Médico Homeopata', value: 'Médico Homeopata' },
    { label: 'Médico Patologista Clínico / Medicina Laboratorial', value: 'Médico Patologista Clínico / Medicina Laboratorial' },
    { label: 'Médico Residente', value: 'Médico Residente' },
    { label: 'Médico Veterinário', value: 'Médico Veterinário' },
    { label: 'Musicoterapeuta', value: 'Musicoterapeuta' },
    { label: 'Nefrologia', value: 'Nefrologia' },
    { label: 'Neurocirurgião', value: 'Neurocirurgião' },
    { label: 'Neurofisiologia Clínica', value: 'Neurofisiologia Clínica' },
    { label: 'Neurologia', value: 'Neurologia' },
    { label: 'Neuropsicólogo', value: 'Neuropsicólogo' },
    { label: 'Nutricionista', value: 'Nutricionista' },
    { label: 'Nutrologia', value: 'Nutrologia' },
    { label: 'Odontologista', value: 'Odontologista' },
    { label: 'Oftalmologista', value: 'Oftalmologista' },
    { label: 'Oncologia', value: 'Oncologia' },
    { label: 'Ortodontia e Ortopedia Facial', value: 'Ortodontia e Ortopedia Facial' },
    { label: 'Ortopedia e Traumatologia', value: 'Ortopedia e Traumatologia' },
    { label: 'Ortoptista', value: 'Ortoptista' },
    { label: 'Otorrinolaringologista', value: 'Otorrinolaringologista' },
    { label: 'Outras', value: 'Outras' },
    { label: 'Patologista', value: 'Patologista' },
    { label: 'Pediatria', value: 'Pediatria' },
    { label: 'Pneumologia', value: 'Pneumologia' },
    { label: 'Podologia', value: 'Podologia' },
    { label: 'Preparador Físico', value: 'Preparador Físico' },
    { label: 'Psicologia Clínica', value: 'Psicologia Clínica' },
    { label: 'Psicopedagogo', value: 'Psicopedagogo' },
    { label: 'Psiquiatra', value: 'Psiquiatra' },
    { label: 'Radiologista / Imaginologista', value: 'Radiologista / Imaginologista' },
    { label: 'Radioterapeuta', value: 'Radioterapeuta' },
    { label: 'Reumatologia', value: 'Reumatologia' },
    { label: 'Sanitarista', value: 'Sanitarista' },
    { label: 'Terapeuta', value: 'Terapeuta' },
    { label: 'Terapeuta Ocupacional', value: 'Terapeuta Ocupacional' },
    { label: 'Trabalhador de Serviços de Limpeza e Conservação de Áreas Públicas', value: 'Trabalhador de Serviços de Limpeza e Conservação de Áreas Públicas' },
    { label: 'Técnico de Enfermagem', value: 'Técnico de Enfermagem' },
    { label: 'Técnico de Enfermagem do Trabalho', value: 'Técnico de Enfermagem do Trabalho' },
    { label: 'Técnico de Laboratório de Análises Físico-Químicas (Materiais de Construção)', value: 'Técnico de Laboratório de Análises Físico-Químicas (Materiais de Construção)' },
    { label: 'Técnico em Acupuntura', value: 'Técnico em Acupuntura' },
    { label: 'Técnico em Fotônica', value: 'Técnico em Fotônica' },
    { label: 'Técnico em Higiene Dental', value: 'Técnico em Higiene Dental' },
    { label: 'Técnico em Patologia Clínica', value: 'Técnico em Patologia Clínica' },
    { label: 'Técnico em Radiologia e Imagenologia', value: 'Técnico em Radiologia e Imagenologia' },
    { label: 'Urologia', value: 'Urologia' },
    { label: 'Visitador Sanitário', value: 'Visitador Sanitário' },
  ];

  form: FormGroup;
  id: number;

  clinic: Clinic;
  regions: string[] = Object.values(Region);
  isBusy: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
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

    this.gerarForm();

    if (id) {
      this._service
        .find(id)
        .subscribe((clinic: any) => {
          this.patchValue(clinic.data);
          this.isLoading = false;
        },
          (error) => {
            this.isBusy = false;
            if (error.error.message) {
              this._snackBar.open(`${error.error.statusCode} - ${error.error.message}`, 'Fechar');
            } else {
              this._snackBar.open('Ops! Algo deu errado. Por favor, tente novamente mais tarde.', 'Fechar');
            }
          });
    }
    this.isLoading = false;
  }

  gerarForm() {
    this.form = this._formBuilder.group({
      businessName: [null, Validators.required],
      tradeName: [null, Validators.required],
      cnpj: [null, Validators.required],
      region: [null, Validators.required],
      medicalSpecialties: [[], [Validators.required, this.validateMedicalSpecialties]],
      inaugurationDate: [null, Validators.required],
      isActive: [true, Validators.required],
    });

  }

  save() {
    this.isBusy = true;
    let clinic = <Clinic>JSON.parse(JSON.stringify(this.form.value));

    if (this.id) {
      this._service.update(this.id, clinic).subscribe((id: number) => {
        if (id) {
          this._snackBar.open(`Clínica atualizada com sucesso`, 'Fechar')
          this._router.navigate(['/clinics', 'view', this.id]);
          this.isBusy = false;
        }
      }, (error) => {
        this.isBusy = false;
        if (error.error.message) {
          this._snackBar.open(`${error.error.statusCode} - ${error.error.message}`, 'Fechar');
        } else {
          this._snackBar.open('Ops! Algo deu errado. Por favor, tente novamente mais tarde.', 'Fechar');
        }
      });
    } else

      this._service.save(clinic).subscribe((clinic: any) => {

        if (clinic) {

          this._snackBar.open(`Clínica salva com sucesso`, 'Fechar')
          this._router.navigate(['/clinics', 'view', clinic.data.id]);

          this.isBusy = false;
        }
      }, (error) => {
        this.isBusy = false;
        if (error.error.message) {
          this._snackBar.open(`${error.error.statusCode} - ${error.error.message}`, 'Fechar');
        } else {
          this._snackBar.open('Ops! Algo deu errado. Por favor, tente novamente mais tarde.', 'Fechar');
        }
      });
  }

  patchValue(clinic: Clinic) {
    console.log(clinic);

    this.form.patchValue(clinic);
    this.clinic = clinic;
  }

  validateMedicalSpecialties(control: { value: any[]; }): { insufficientSelection: boolean } | null {
    const selectedMedicalSpecialties = control.value;
    return selectedMedicalSpecialties && selectedMedicalSpecialties.length >= 5 ? null : { insufficientSelection: true };
  }

  remove() {
    const modalRef = this._dialog.open(ModalRemoverComponent, {
      minWidth: '30vw', hasBackdrop: true,
      data: `${this.clinic.tradeName}`
    })
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.isBusy = true;

        let id = this._route.snapshot.params['id'];
        this._service.remove(id).subscribe(() => {
          this._snackBar.open(`Clínica removida com sucesso`, 'Fechar')
          this._router.navigate(['/clinics']);
        }, error => {
          this.isBusy = false;
          if (error.error.message) {
            this._snackBar.open(`${error.error.statusCode} - ${error.error.message}`, 'Fechar');
          } else {
            this._snackBar.open('Ops! Algo deu errado. Por favor, tente novamente mais tarde.', 'Fechar');
          }
        });
      }
    })
  }

  back() {
    this._router.navigate(['/clinics']);
  }
}
