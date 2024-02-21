import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica-edit',
  templateUrl: './historia-clinica-edit.component.html',
  styleUrls: ['./historia-clinica-edit.component.scss'],
})

export class HistoriaClinicaEditComponent implements OnInit{

  public esMayorDeEdad: boolean = false;
  public esMenordeEdad: boolean = false;


  
/*Elementos de la firma*/ 
  @ViewChild('signature') signature!: NgxSignaturePadComponent;
  public firmaImagen: any = null;
  public firmaImagenShow: string | null = null;
  public showEditFirma: boolean = false;
  public isEditPerfil: boolean = false;
  public user_id!: string;
  public perfilForm = this.formBuilder.group({
    expediente: ['', Validators.required],
    cedula_profesional: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });

  public options: any = {
    backgroundColor: '#F4F5F5',
    minWidth: 1,
    
    css: {
      /*'border': '1px dashed #000',
      'width': '300px',
      'margin-bottom': '20px',*/

      'border': '1px solid #ccc',
      'height': '200px',
      'width': '400px',
    },
  };

  onBeginSign(): void {
    console.log('on begin sing');
  }

  onEndSign(): void {
    console.log("this.signature:", this.signature)
    if (this.signature) {
      this.firmaImagen = this.signature.toDataURL();
    }
  }

  async dataURLtoBlob(dataURL: string): Promise<Blob> {
    return new Promise((resolve) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      resolve(blob);
    });
  }
  
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

  public evidencia1: FormControl = new FormControl('');
  public evidencia2: FormControl = new FormControl('');
  public evidencia3: FormControl = new FormControl('');
  public evidencia4: FormControl = new FormControl('');
  public evidencia5: FormControl = new FormControl('');

  public showPacienteInfoTab: boolean = true;
  public showAntecedentesInfoTab: boolean = false;
  public showAparatosInfoTab: boolean = false;
  public showExploracionInfoTab: boolean = false;
  public showAutorizacionInfoTab: boolean = false;


  public showDigestivoOtroTextarea: boolean = false;
  public showRespiratorioOtroTextarea: boolean = false;
  public showCirculatorioOtroTextarea: boolean = false;
  public showGenitoUrinarioOtroTextarea: boolean = false;
  public showSistNerviosoOtroTextarea: boolean = false;
  public showSintomasGeneralesOtroTextarea: boolean = false;

  public historiaClinicaForm = this.formBuilder.group({
    //INFORMACION GENERAL DEL PACIENTE
    nombre_tutor:[''],
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
    //ANTECEDENTES
    antecedentes_hereditarios: [],
    alcoholismo: [],
    tabaquismo: [],
    toxicomanias: [],
    higiene: [],
    alimentacion: [],
    condicion : [],
    socioconomia: [],
    habitos: [],
    ant_personales_otros_textarea: [''],
    //
    enf_infancia: [],
    Fimicos: [], 
    Lueticos: [],
    Diabeticos: [],
    Quirurgicos: [],
    Traumaticos: [],
    Ictericos: [],
    Epilepticos: [],
    Alergicos: [],
    Reumaticos: [],
    Transfusiones: [],
    Enfermedades_Cardiovasculares: [],
    Incidencia_de_Infecciones_Bucales: [],
    Neoplasticas: [],
    SIDA: [],
    ant_personales_p_otros_textarea: [''],
    padecimiento_principio: [''],
    padecimiento_evolucion: [''],
    padecimiento_estado_actual: [''],
     
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
    //EXPLORACION FISICA HABITUS EXTERIOR
    exploracion_fisica_raza_sexo_edad_facies_estado_conciencia: [],
    exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales: [],
    exploracion_fisica_signos_vitales: [],
    exploracion_fisica_TA: [],
    exploracion_fisica_frec_respiratoria: [],
    exploracion_fisica_temperatura: [],
    exploracion_fisica_peso: [],
  });


  //ENFERMEDADES
  public esDiabetico: boolean = false;
  public esAlcoholico: boolean = false;
  public esFumador: boolean = false;
  public esEpileptico: boolean = false;
  public esReumatico: boolean = false;
  public esAlergico: boolean = false;

  public estudianteData:any = {}

  public isAprobadoAnyConsulta:boolean = false;


  public historia_clinica_id:any = ''
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private _route: ActivatedRoute,
    private _perfil_estudiante: PerfilEstudiantesService,
    private _asignaturas:asignaturaService
  ) {}

  ngOnInit(): void {
    let user:any = localStorage.getItem("user")
    user = JSON.parse(user)
    

    this._route.params.subscribe((param) => {
      this.historia_clinica_id = param['id']
      if(this.historia_clinica_id){
        this.apiSevice.getHistoriaClinica(this.historia_clinica_id).subscribe(
          (response: any) => {
           console.log("RESPONSE:", response.item)

           this.historiaClinicaForm.get("nombre_completo")?.setValue(response?.item?.paciente?.nombre_completo)
           
           /*Valor de la fecha de nacimiento*/ 
           const fechaNacimiento = response?.item?.paciente?.fecha_de_nacimiento;
           const edad= this.calcularEdad(fechaNacimiento);
           console.log(edad);
           if(edad!=-1){
            if (edad < 18) {
              this.esMayorDeEdad =false;
              this.esMenordeEdad = true;
            } else{
              this.esMayorDeEdad = true;
              this.esMenordeEdad = false;
            }
          }else{
            this.esMayorDeEdad=false;
            this.esMenordeEdad = false;
          }

          
           this.historiaClinicaForm.get("fecha_de_nacimiento")?.setValue(response?.item?.paciente?.fecha_de_nacimiento)
           this.historiaClinicaForm.get('nombre_tutor')?.setValue(response?.item?.historia_clinica?.nombre_tutor)
           this.historiaClinicaForm.get("genero")?.setValue(response?.item?.paciente?.genero)
           this.historiaClinicaForm.get("estado_civil")?.setValue(response?.item?.paciente?.estado_civil)
           this.historiaClinicaForm.get("ocupacion")?.setValue(response?.item?.paciente?.ocupacion)
           this.historiaClinicaForm.get("domicilio")?.setValue(response?.item?.paciente?.domicilio)
           this.historiaClinicaForm.get("telefono")?.setValue(response?.item?.paciente?.telefono)
           this.historiaClinicaForm.get("ciudad_origen")?.setValue(response?.item?.paciente?.ciudad_origen)
           this.historiaClinicaForm.get("estado_origen")?.setValue(response?.item?.paciente?.estado_origen)
           this.historiaClinicaForm.get("pais_origen")?.setValue(response?.item?.paciente?.pais_origen)
           this.historiaClinicaForm.get("ciudad_Actual")?.setValue(response?.item?.paciente?.ciudad_Actual)
           this.historiaClinicaForm.get("nombre_contacto_emergencia")?.setValue(response?.item?.paciente?.nombre_contacto_emergencia)
           this.historiaClinicaForm.get("parentesco_contacto_emergencia")?.setValue(response?.item?.paciente?.parentesco_contacto_emergencia)
           this.historiaClinicaForm.get("telefono_contacto_emergencia")?.setValue(response?.item?.paciente?.telefono_contacto_emergencia)

           this.historiaClinicaForm.get("antecedentes_hereditarios")?.setValue(response?.item?.historia_clinica?.antecedentes_hereditarios)
           this.historiaClinicaForm.get("alcoholismo")?.setValue(response?.item?.historia_clinica?.alcoholismo)
           if(response?.item?.historia_clinica?.alcoholismo){
            this.esAlcoholico
           }
           if(response?.item?.historia_clinica?.tabaquismo){
            this.esFumador
           }
           if(response?.item?.historia_clinica?.Diabeticos){
            this.esDiabetico
           }
           if(response?.item?.historia_clinica?.Alergicos){
            this.esAlergico
           }
           if(response?.item?.historia_clinica?.Reumaticos){
            this.esReumatico
           }
           if(response?.item?.historia_clinica?.Epilepticos){
            this.esEpileptico
           }

           this.historiaClinicaForm.get("tabaquismo")?.setValue(response?.item?.historia_clinica?.tabaquismo)
           this.historiaClinicaForm.get("toxicomanias")?.setValue(response?.item?.historia_clinica?.toxicomanias)
           this.historiaClinicaForm.get("higiene")?.setValue(response?.item?.historia_clinica?.higiene)
           this.historiaClinicaForm.get("alimentacion")?.setValue(response?.item?.historia_clinica?.alimentacion)
           this.historiaClinicaForm.get("condicion")?.setValue(response?.item?.historia_clinica?.condicion)
           this.historiaClinicaForm.get("socioconomia")?.setValue(response?.item?.historia_clinica?.socioconomia)
           this.historiaClinicaForm.get("habitos")?.setValue(response?.item?.historia_clinica?.habitos)
           this.historiaClinicaForm.get("ant_personales_otros_textarea")?.setValue(response?.item?.historia_clinica?.ant_personales_otros_textarea)
           this.historiaClinicaForm.get("padecimiento_principio")?.setValue(response?.item?.historia_clinica?.padecimiento_principio)
           this.historiaClinicaForm.get("padecimiento_evolucion")?.setValue(response?.item?.historia_clinica?.padecimiento_evolucion)
           this.historiaClinicaForm.get("padecimiento_estado_actual")?.setValue(response?.item?.historia_clinica?.padecimiento_estado_actual)
           this.historiaClinicaForm.get("ant_personales_p_otros_textarea")?.setValue(response?.item?.historia_clinica?.ant_personales_p_otros_textarea)
           
           this.historiaClinicaForm.get("enf_infancia")?.setValue(response?.item?.historia_clinica?.enf_infancia)
           this.historiaClinicaForm.get("Fimicos")?.setValue(response?.item?.historia_clinica?.Fimicos)
           this.historiaClinicaForm.get("Lueticos")?.setValue(response?.item?.historia_clinica?.Lueticos)
           this.historiaClinicaForm.get("Diabeticos")?.setValue(response?.item?.historia_clinica?.Diabeticos)
           this.historiaClinicaForm.get("Quirurgicos")?.setValue(response?.item?.historia_clinica?.Quirurgicos)
           this.historiaClinicaForm.get("Traumaticos")?.setValue(response?.item?.historia_clinica?.Traumaticos)
           this.historiaClinicaForm.get("Ictericos")?.setValue(response?.item?.historia_clinica?.Ictericos)
           this.historiaClinicaForm.get("Epilepticos")?.setValue(response?.item?.historia_clinica?.Epilepticos)
           this.historiaClinicaForm.get("Alergicos")?.setValue(response?.item?.historia_clinica?.Alergicos)
           this.historiaClinicaForm.get("Reumaticos")?.setValue(response?.item?.historia_clinica?.Reumaticos)
           this.historiaClinicaForm.get("Transfusiones")?.setValue(response?.item?.historia_clinica?.Transfusiones)
           this.historiaClinicaForm.get("Enfermedades_Cardiovasculares")?.setValue(response?.item?.historia_clinica?.Enfermedades_Cardiovasculares)
           this.historiaClinicaForm.get("Incidencia_de_Infecciones_Bucales")?.setValue(response?.item?.historia_clinica?.Incidencia_de_Infecciones_Bucales)
           this.historiaClinicaForm.get("Neoplasticas")?.setValue(response?.item?.historia_clinica?.Neoplasticas)
           this.historiaClinicaForm.get("SIDA")?.setValue(response?.item?.historia_clinica?.SIDA)
          

           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_apetito")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_apetito)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Masticacion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Masticacion)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Deglucion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Deglucion)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Disfagia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Disfagia)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Nauseas")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Nauseas)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Vomito")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Vomito)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Dolor_Abdominal")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Dolor_Abdominal)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Hematemsis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Hematemsis)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Pirosis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Pirosis)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Meteorismo")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Meteorismo)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Diarrea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Diarrea)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Estrenimiento")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Estrenimiento)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Melena")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Melena)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Rectorragia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Rectorragia)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Epistasis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Epistasis)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Tos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Tos)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Disnea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Disnea)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Expectoracion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Expectoracion)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Asma")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Asma)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Dolor_al_respirar")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Dolor_al_respirar)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Disfonia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Disfonia)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Gripa_frecuente")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Gripa_frecuente)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Disnea_del_esfuerzo")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Disnea_del_esfuerzo)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Dolor_retroesternal")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Dolor_retroesternal)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Palpitaciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Palpitaciones)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Edema")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Edema)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Lipotimias")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Lipotimias)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Calambres")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Calambres)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Cianosis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Cianosis)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Acufenos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Acufenos)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Fosfenos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Fosfenos)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Frecuencia_de_micciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Frecuencia_de_micciones)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Color")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Color)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Diuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Diuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Nicturia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Nicturia)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Hematuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Hematuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Poliuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Poliuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Ansiedad")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Ansiedad)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Temor")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Temor)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Convulciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Convulciones)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Paralisis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Paralisis)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Temblores")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Temblores)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Tics")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Tics)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Vista")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Vista)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Oido")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Oido)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Tacto")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Tacto)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Variacion_de_peso")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Variacion_de_peso)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Astenia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Astenia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Adinamia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Adinamia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Fiebre")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Fiebre)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Escalofrios")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Escalofrios)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Anorexia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Anorexia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_otros)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_otros_textarea)
           this.historiaClinicaForm.get("exploracion_fisica_raza_sexo_edad_facies_estado_conciencia")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_raza_sexo_edad_facies_estado_conciencia)
           this.historiaClinicaForm.get("exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales)
           this.historiaClinicaForm.get("exploracion_fisica_signos_vitales")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_signos_vitales)
           this.historiaClinicaForm.get("exploracion_fisica_TA")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_TA)
           this.historiaClinicaForm.get("exploracion_fisica_frec_respiratoria")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_frec_respiratoria)
           this.historiaClinicaForm.get("exploracion_fisica_temperatura")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_temperatura)
           this.historiaClinicaForm.get("exploracion_fisica_peso")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_peso)
          },
          (error: any) => {
            console.error('Error al registrar el usuario', error);
          }
        );
      }
    })

  
this.historiaClinicaForm.controls.fecha_de_nacimiento.valueChanges.subscribe((valor:any)=>{
  const fechaNacimiento = valor;
  const edad= this.calcularEdad(fechaNacimiento);
  console.log(edad);
  if(edad!=-1){
   if (edad < 18) {
     this.esMayorDeEdad =false;
     this.esMenordeEdad = true;
   } else{
     this.esMayorDeEdad = true;
     this.esMenordeEdad = false;
   }
 }else{
   this.esMayorDeEdad=false;
   this.esMenordeEdad = false;
 }

}) 



    this.historiaClinicaForm.controls.Diabeticos.valueChanges.subscribe((valor:any) => {
        if(valor){
          this.esDiabetico = true;
        }else{
          this.esDiabetico = false;
        }
    })

    this.historiaClinicaForm.controls.alcoholismo.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esAlcoholico = true;
      }else{
        this.esAlcoholico = false;
      }
  })

  
    this.historiaClinicaForm.controls.tabaquismo.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esFumador = true;
      }else{
        this.esFumador = false;
      }
  })


    this.historiaClinicaForm.controls.Epilepticos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esEpileptico = true;
      }else{
        this.esEpileptico = false;
      }
    })


    this.historiaClinicaForm.controls.Reumaticos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esReumatico = true;
      }else{
        this.esReumatico = false;
      }
    })


    this.historiaClinicaForm.controls.Alergicos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esAlergico = true;
      }else{
        this.esAlergico = false;
      }
    })



  }



//Funcion para obtener la edad del paciente
  public calcularEdad(fecha_nacimiento: string){
    // Verificar si la fecha de nacimiento es proporcionada
    if (!fecha_nacimiento) {
      console.error("Fecha de nacimiento no proporcionada");
      return -1; // Retorna un valor negativo para indicar un error o una edad no válida
    }
    // Convertir la cadena de fecha de nacimiento a un objeto Date
    const fechaNacimiento = new Date(fecha_nacimiento);
    // Obtener la fecha actual
    const ahora = new Date();
    // Calcular la diferencia de años
    const edad = ahora.getFullYear() - fechaNacimiento.getFullYear();
    // Verificar si el cumpleaños ya pasó este año
    if (
      ahora.getMonth() < fechaNacimiento.getMonth() ||
      (ahora.getMonth() === fechaNacimiento.getMonth() &&
        ahora.getDate() < fechaNacimiento.getDate())
    ) {
      return edad - 1; // Restar 1 año si el cumpleaños aún no ha llegado este año
    } else {
      return edad;
    }

  }

  




  public viewEvidencia(url:string){
    window.open(url,"_blank")
  }


  public onSubmit() {
   

    const item = {
     ...this.historiaClinicaForm.value,
     firmaPaciente: this.firmaImagen,
      paciente: {
        nombre_completo: this.historiaClinicaForm.get("nombre_completo")?.value,
        fecha_de_nacimiento : this.historiaClinicaForm.get("fecha_de_nacimiento")?.value,
        genero: this.historiaClinicaForm.get("genero")?.value,
        estado_civil: this.historiaClinicaForm.get("estado_civil")?.value,
        ocupacion: this.historiaClinicaForm.get("ocupacion")?.value,
        domicilio: this.historiaClinicaForm.get("domicilio")?.value,
        telefono: this.historiaClinicaForm.get("telefono")?.value,
        ciudad_origen: this.historiaClinicaForm.get("ciudad_origen")?.value,
        estado_origen: this.historiaClinicaForm.get("estado_origen")?.value,
        pais_origen: this.historiaClinicaForm.get("pais_origen")?.value,
        ciudad_Actual : this.historiaClinicaForm.get("ciudad_Actual")?.value,
        nombre_contacto_emergencia: this.historiaClinicaForm.get("nombre_contacto_emergencia")?.value,
        parentesco_contacto_emergencia: this.historiaClinicaForm.get("parentesco_contacto_emergencia")?.value,
        telefono_contacto_emergencia: this.historiaClinicaForm.get("telefono_contacto_emergencia")?.value,


      }
    };

    this.apiSevice.updateHistoriaClinica(this.historia_clinica_id, item).subscribe(
      (response: any) => {
        console.log('historia clinica guardada con exito', response);
        this.historiaClinicaForm.reset();
        Swal.fire(
          'Historia clinica actualizada con exito',
          'En breve seras redirigido a tu tablero digital...',
          'success'
        )
        setTimeout(() => {
          this._general.navigateBy('/estudiante');
        }, 3000);
      },
      (error: any) => {
        console.error('Error al guardar la historia clinica', error);
      }
    );
  }


  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as Base64'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onFileSelected(event: Event, type:String) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if(type === "evidencia1")  this.evidencia1.setValue(await this.fileToBase64(input.files[0]))
      if(type === "evidencia2")  this.evidencia2.setValue(await this.fileToBase64(input.files[0]))
      if(type === "evidencia3")  this.evidencia3.setValue(await this.fileToBase64(input.files[0]))
      if(type === "evidencia4")  this.evidencia4.setValue(await this.fileToBase64(input.files[0]))
      if(type === "evidencia5")  this.evidencia5.setValue(await this.fileToBase64(input.files[0]))
    }
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
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = true;
  }

  public nextPaso3(){
    this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = true;
      this.showAntecedentesInfoTab = false;
  }

  public nextPaso4(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = true;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = false;
  }

  public nextPaso5(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = false;
  }


  public changeTab(tabName: string) {
    if (tabName === 'informacion_general_del_paciente') {
      this.showPacienteInfoTab = true;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
    }
    if (tabName === 'antecedentes') {
      this.showPacienteInfoTab = false;
      this.showAntecedentesInfoTab = true
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAutorizacionInfoTab = false;
    }
    if (tabName === 'aparatos_y_sistemas') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = true;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
    }
    if (tabName === 'exploracion_fisica') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = true;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
    }
    if (tabName === 'carta') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = true;
    }
  }
}
