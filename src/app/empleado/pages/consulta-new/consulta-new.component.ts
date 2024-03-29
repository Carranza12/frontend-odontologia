import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-consulta-new',
  templateUrl: './consulta-new.component.html',
  styleUrls: ['./consulta-new.component.scss'],
})
export class ConsultaNewComponent implements OnInit {
  public nombre_paciente_autocomplete: FormControl = new FormControl('');
  public list_pacientes: any = [];
  public showAutocomplete: boolean = true;
  public showPatientDetail: boolean = false;
  public patient: any = {};
  public userData: any = {};
  public isKeywordAutocomplete: boolean = false;
  public myAngularxQrCode!: string;

  constructor(
    private _paciente: PacienteService,
    private _router: Router,
    private auth: AuthService,
    public _general: GeneralService
  ) {
    this.myAngularxQrCode = 'Your QR code data string';
  }

  async ngOnInit() {
    const user_json = localStorage.getItem('user');
    if (user_json) {
      this.userData = JSON.parse(user_json);
    }

    this.nombre_paciente_autocomplete.valueChanges.subscribe((nombre) => {
      this.isKeywordAutocomplete = true;
      this._paciente.getPacientes().subscribe((pacientes: any) => {
        this.list_pacientes = pacientes.filter((paciente: any) =>
          paciente.nombre_completo.toLowerCase().includes(nombre)
        );
      });
    });

    let urlTree = this._router.parseUrl(this._router.url);
    let patientCreated = urlTree.queryParams['patientCreated'];
    let nombre_completo = urlTree.queryParams['nombre'];
    let historia_clinica_id = urlTree.queryParams['historia_id'];
    if (patientCreated && nombre_completo && historia_clinica_id) {
      const patient = {
        nombre_completo,
        historia_clinica_id
      }
      this.selectPatient(patient)
    }
  }

  public openAutocomplete() {
    this.isKeywordAutocomplete = true;
    this._paciente.getPacientes().subscribe((pacientes: any) => {
      this.list_pacientes = pacientes;
    });
  }

  public closeAutocomplete() {
    this.isKeywordAutocomplete = false;
    this.list_pacientes = [];
  }

  public goNewPatient() {
    this._router.navigateByUrl('trabajador/pacientes/nuevo');
  }

  public selectPatient(patient: any) {
    console.log("paciente:", patient)
    this.showAutocomplete = false;
    this.showPatientDetail = true;
    this.patient.nombre_completo = patient.nombre_completo;
    this.patient.fecha_consulta = new Date();
    this.patient.consulta_generada = this.userData.fullName;
    this.myAngularxQrCode = `192.168.1.114200/estudiante/historia-clinica/edicion/${patient.historia_clinica_id}`;
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(
        `CONSULTA_${this.patient.nombre_completo}_${this.patient.fecha_consulta}.pdf`
      );
    });
  }
}
