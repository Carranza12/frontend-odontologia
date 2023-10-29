import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-historia-clinica-edit',
  templateUrl: './historia-clinica-edit.component.html',
  styleUrls: ['./historia-clinica-edit.component.scss'],
})
export class HistoriaClinicaEditComponent implements OnInit{
  public gender_options = [
    {
      value: 'm',
      text: 'Masculino',
    },
    {
      value: 'f',
      text: 'Femenino',
    },
  ];

  public countries_options = [
    {
      value: 'Mexico',
      text: 'Mexico',
    },
  ];

  public cities_options = [
    {
      value: 'Torreon',
      text: 'Torreon',
    },
  ];

  public estates_mexico_options = [
    { value: 'Aguascalientes', text: 'Aguascalientes' },
    { value: 'Baja California', text: 'Baja California' },
    { value: 'Baja California Sur', text: 'Baja California Sur' },
    { value: 'Campeche', text: 'Campeche' },
    { value: 'Chiapas', text: 'Chiapas' },
    { value: 'Chihuahua', text: 'Chihuahua' },
    { value: 'Ciudad de México', text: 'Ciudad de México' },
    { value: 'Coahuila', text: 'Coahuila' },
    { value: 'Colima', text: 'Colima' },
    { value: 'Durango', text: 'Durango' },
    { value: 'Estado de México', text: 'Estado de México' },
    { value: 'Guanajuato', text: 'Guanajuato' },
    { value: 'Guerrero', text: 'Guerrero' },
    { value: 'Hidalgo', text: 'Hidalgo' },
    { value: 'Jalisco', text: 'Jalisco' },
    { value: 'Michoacán', text: 'Michoacán' },
    { value: 'Morelos', text: 'Morelos' },
    { value: 'Nayarit', text: 'Nayarit' },
    { value: 'Nuevo León', text: 'Nuevo León' },
    { value: 'Oaxaca', text: 'Oaxaca' },
    { value: 'Puebla', text: 'Puebla' },
    { value: 'Querétaro', text: 'Querétaro' },
    { value: 'Quintana Roo', text: 'Quintana Roo' },
    { value: 'San Luis Potosí', text: 'San Luis Potosí' },
    { value: 'Sinaloa', text: 'Sinaloa' },
    { value: 'Sonora', text: 'Sonora' },
    { value: 'Tabasco', text: 'Tabasco' },
    { value: 'Tamaulipas', text: 'Tamaulipas' },
    { value: 'Tlaxcala', text: 'Tlaxcala' },
    { value: 'Veracruz', text: 'Veracruz' },
    { value: 'Yucatán', text: 'Yucatán' },
    { value: 'Zacatecas', text: 'Zacatecas' },
  ];

  public status_options = [
    {
      value: 'Soltero/a',
      text: 'Soltero/a',
    },
    {
      value: 'Casado/a',
      text: 'Casado/a',
    },
    {
      value: 'Divorciado/a',
      text: 'Divorciado/a',
    },
    {
      value: 'Separado/a en proceso judicial',
      text: 'Separado/a en proceso judicial',
    },
    {
      value: 'Viudo/a',
      text: 'Viudo/a',
    },
    {
      value: 'Concubinato',
      text: 'Concubinato',
    },
  ];

  public parentescos_options = [
    { value: 'padre', text: 'Padre' },
    { value: 'madre', text: 'Madre' },
    { value: 'hijo', text: 'Hijo' },
    { value: 'hija', text: 'Hija' },
    { value: 'abuelo', text: 'Abuelo' },
    { value: 'abuela', text: 'Abuela' },
    { value: 'hermano', text: 'Hermano' },
    { value: 'hermana', text: 'Hermana' },
    { value: 'tío', text: 'Tío' },
    { value: 'tía', text: 'Tía' },
    { value: 'primo', text: 'Primo' },
    { value: 'prima', text: 'Prima' },
    { value: 'sobrino', text: 'Sobrino' },
    { value: 'sobrina', text: 'Sobrina' },
    { value: 'esposo', text: 'Esposo' },
    { value: 'esposa', text: 'Esposa' },
    { value: 'novio', text: 'Novio' },
    { value: 'novia', text: 'Novia' },
  ];

  public showPacienteInfoTab: boolean = true;
  public showAparatosInfoTab: boolean = false;
  public showExploracionInfoTab: boolean = false;
  public showConsultasInfoTab: boolean = false;
  public showOdontogramaInfoTab: boolean = false;

  public showDigestivoOtroTextarea: boolean = false;
  public showRespiratorioOtroTextarea: boolean = false;
  public showCirculatorioOtroTextarea: boolean = false;
  public showGenitoUrinarioOtroTextarea: boolean = false;
  public showSistNerviosoOtroTextarea: boolean = false;
  public showSintomasGeneralesOtroTextarea: boolean = false;

  public historiaClinicaForm = this.formBuilder.group({
    //INFORMACION GENERAL DEL PACIENTE
    nombre_completo: ['', Validators.required],
    fecha_de_nacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    estado_civil: ['', Validators.required],
    ocupacion: ['', Validators.required],
    domicilio: ['', Validators.required],
    telefono: ['', Validators.required],
    ciudad_origen: ['', Validators.required],
    estado_origen: ['', Validators.required],
    pais_origen: ['', Validators.required],
    ciudad_Actual: ['', Validators.required],
    nombre_contacto_emergencia: ['', Validators.required],
    parentesco_contacto_emergencia: ['', Validators.required],
    telefono_contacto_emergencia: ['', Validators.required],
    //DIGESTIVO
    aparatos_sistemas_digestivo_apetito: [],
    aparatos_sistemas_digestivo_Masticacion: [],
    aparatos_sistemas_digestivo_Deglucion: [],
    aparatos_sistemas_digestivo_Disfagia: [],
    aparatos_sistemas_digestivo_Nauseas: [],
    aparatos_sistemas_digestivo_Vomito: [],
    aparatos_sistemas_digestivo_Dolor_Abdominal: [],
    aparatos_sistemas_digestivo_Hematemsis: [],
    aparatos_sistemas_digestivo_Pirosis: [],
    aparatos_sistemas_digestivo_Meteorismo: [],
    aparatos_sistemas_digestivo_Diarrea: [],
    aparatos_sistemas_digestivo_Estrenimiento: [],
    aparatos_sistemas_digestivo_Melena: [],
    aparatos_sistemas_digestivo_Rectorragia: [],
    aparatos_sistemas_digestivo_Otros: [],
    aparatos_sistemas_digestivo_Otros_textarea: [],
    //SISTEMAS RESPIRATOIROS
    aparatos_sistemas_respiratorio_Epistasis: [],
    aparatos_sistemas_respiratorio_Tos: [],
    aparatos_sistemas_respiratorio_Disnea: [],
    aparatos_sistemas_respiratorio_Expectoracion: [],
    aparatos_sistemas_respiratorio_Asma: [],
    aparatos_sistemas_respiratorio_Dolor_al_respirar: [],
    aparatos_sistemas_respiratorio_Disfonia: [],
    aparatos_sistemas_respiratorio_Gripa_frecuente: [],
    aparatos_sistemas_respiratorio_Otros: [],
    aparatos_sistemas_respiratorio_Otros_textarea: [],
    // CIRCULATORIO
    aparatos_sistemas_circulatorio_Disnea_del_esfuerzo: [],
    aparatos_sistemas_circulatorio_Dolor_retroesternal: [],
    aparatos_sistemas_circulatorio_Palpitaciones: [],
    aparatos_sistemas_circulatorio_Edema: [],
    aparatos_sistemas_circulatorio_Lipotimias: [],
    aparatos_sistemas_circulatorio_Calambres: [],
    aparatos_sistemas_circulatorio_Cianosis: [],
    aparatos_sistemas_circulatorio_Acufenos: [],
    aparatos_sistemas_circulatorio_Fosfenos: [],
    aparatos_sistemas_circulatorio_Otros: [],
    aparatos_sistemas_circulatorio_Otros_textarea: [],
    //GENITO URINARIO
    aparatos_sistemas_genito_urinario_Frecuencia_de_micciones: [],
    aparatos_sistemas_genito_urinario_Color: [],
    aparatos_sistemas_genito_urinario_Diuria: [],
    aparatos_sistemas_genito_urinario_Nicturia: [],
    aparatos_sistemas_genito_urinario_Hematuria: [],
    aparatos_sistemas_genito_urinario_Poliuria: [],
    aparatos_sistemas_genito_urinario_Otros: [],
    aparatos_sistemas_genito_urinario_Otros_textarea: [],
    // SISTEMA NERVIOSO
    aparatos_sistemas_sist_nervioso_Ansiedad: [],
    aparatos_sistemas_sist_nervioso_Temor: [],
    aparatos_sistemas_sist_nervioso_Convulciones: [],
    aparatos_sistemas_sist_nervioso_Paralisis: [],
    aparatos_sistemas_sist_nervioso_Temblores: [],
    aparatos_sistemas_sist_nervioso_Tics: [],
    aparatos_sistemas_sist_nervioso_Vista: [],
    aparatos_sistemas_sist_nervioso_Oido: [],
    aparatos_sistemas_sist_nervioso_Tacto: [],
    aparatos_sistemas_sist_nervioso_Otros: [],
    aparatos_sistemas_sist_nervioso_Otros_textarea: [],
    // SINTOMAS GENERALES
    aparatos_sistemas_sintomas_generales_Variacion_de_peso: [],
    aparatos_sistemas_sintomas_generales_Astenia: [],
    aparatos_sistemas_sintomas_generales_Adinamia: [],
    aparatos_sistemas_sintomas_generales_Fiebre: [],
    aparatos_sistemas_sintomas_generales_Escalofrios: [],
    aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa: [],
    aparatos_sistemas_sintomas_generales_Anorexia: [],
    aparatos_sistemas_sintomas_generales_otros: [],
    aparatos_sistemas_sintomas_generales_otros_textarea: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      const historia_clinica_id = param['id']
      if(historia_clinica_id){
        this.apiSevice.getHistoriaClinica(historia_clinica_id).subscribe(
          (response: any) => {
           
           console.log("item:", response.item)
           this.historiaClinicaForm.get("nombre_completo")?.setValue(response?.item?.paciente?.nombre_completo)
          },
          (error: any) => {
            console.error('Error al registrar el usuario', error);
          }
        );
      }
    })
  }

  public onSubmit() {
    if (this.historiaClinicaForm.invalid) {
      return;
    }

    const item = {
      nombre_completo: this.historiaClinicaForm.get('nombre_completo')?.value,
      /*  fecha_de_nacimiento :  this.historiaClinicaForm.get("fecha_de_nacimiento")?.value,
      genero :  this.historiaClinicaForm.get("genero")?.value,
      estado_civil :  this.historiaClinicaForm.get("estado_civil")?.value,
      ocupacion :  this.historiaClinicaForm.get("ocupacion")?.value,
      domicilio:  this.historiaClinicaForm.get("domicilio")?.value,
      telefono:  this.historiaClinicaForm.get("telefono")?.value,
      ciudad_origen:  this.historiaClinicaForm.get("ciudad_origen")?.value,
      estado_origen:  this.historiaClinicaForm.get("estado_origen")?.value,
      pais_origen:  this.historiaClinicaForm.get("pais_origen")?.value,
      ciudad_Actual:  this.historiaClinicaForm.get("ciudad_Actual")?.value,
      nombre_contacto_emergencia:  this.historiaClinicaForm.get("nombre_contacto_emergencia")?.value,
      parentesco_contacto_emergencia:  this.historiaClinicaForm.get("parentesco_contacto_emergencia")?.value,
      telefono_contacto_emergencia:  this.historiaClinicaForm.get("telefono_contacto_emergencia")?.value, */
      historia_clinica_id: '',
    };

    console.log('ITEM:', item);

    this.apiSevice.createPacienteAndHistoriaClinica(item).subscribe(
      (response: any) => {
        console.log('Usuario registrado con éxito', response);
        this.historiaClinicaForm.reset();
        this._general.navigateBy('/trabajador/consultas');
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }

  public otroCheckbox() {
    this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showDigestivoOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showRespiratorioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showCirculatorioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showGenitoUrinarioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showSistNerviosoOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros")?.valueChanges.subscribe((valor:any) => {
      this.showSintomasGeneralesOtroTextarea = valor
    })
  
  }

  public nextPaso2(){
    this.showPacienteInfoTab = false;
    this.showConsultasInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = true;
    this.showOdontogramaInfoTab = false;
  }

  public nextPaso3(){
    this.showPacienteInfoTab = false;
      this.showConsultasInfoTab = false;
      this.showExploracionInfoTab = true;
      this.showAparatosInfoTab = false;
      this.showOdontogramaInfoTab = false;
  }

  public nextPaso4(){
    this.showPacienteInfoTab = false;
    this.showConsultasInfoTab = true;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showOdontogramaInfoTab = false;
  }

  public nextPaso5(){
    this.showPacienteInfoTab = false;
    this.showConsultasInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showOdontogramaInfoTab = true;
  }
  public changeTab(tabName: string) {
    if (tabName === 'informacion_general_del_paciente') {
      this.showPacienteInfoTab = true;
      this.showConsultasInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showOdontogramaInfoTab = false;
    }
    if (tabName === 'aparatos_y_sistemas') {
      this.showPacienteInfoTab = false;
      this.showConsultasInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = true;
      this.showOdontogramaInfoTab = false;
    }
    if (tabName === 'exploracion_fisica') {
      this.showPacienteInfoTab = false;
      this.showConsultasInfoTab = false;
      this.showExploracionInfoTab = true;
      this.showAparatosInfoTab = false;
      this.showOdontogramaInfoTab = false;
    }
    if (tabName === 'consultas_del_paciente') {
      this.showPacienteInfoTab = false;
      this.showConsultasInfoTab = true;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showOdontogramaInfoTab = false;
    }
    if (tabName === 'odontograma') {
      this.showPacienteInfoTab = false;
      this.showConsultasInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showOdontogramaInfoTab = true;
    }
  }
}
