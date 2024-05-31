import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-paciente-new',
  templateUrl: './paciente-new.component.html',
  styleUrls: ['./paciente-new.component.scss'],
})
export class PacienteNewComponent {
  public isOnCamera: boolean = false;
  private trigger: Subject<void> = new Subject<void>();

  public credencialSrc!:string


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

  public pacienteForm = this.formBuilder.group({
    nombre_completo: ['', Validators.required],
    /* fecha_de_nacimiento :  ["", Validators.required],
    genero :  ["", Validators.required],
    estado_civil :  ["", Validators.required],
    ocupacion :  ["", Validators.required],
    domicilio:  ["", Validators.required],
    telefono:  ["", Validators.required],
    ciudad_origen:  ["", Validators.required],
    estado_origen:  ["", Validators.required],
    pais_origen:  ["", Validators.required],
    ciudad_Actual:  ["", Validators.required],
    nombre_contacto_emergencia:  ["", Validators.required],
    parentesco_contacto_emergencia:  ["", Validators.required],
    telefono_contacto_emergencia:  ["", Validators.required], */
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private loadingService: LoadingService
  ) {}
  public onCamera() {
    this.isOnCamera = !this.isOnCamera;
    if (this.isOnCamera) {
      const cameraView = document.getElementById('camera-view');
      if (cameraView) {
        const imgElements = cameraView.querySelectorAll('img');
        imgElements.forEach(img => {
          img.remove();
        });
      }
    }
    console.log("this.credencialSrc:", this.credencialSrc)
  }
  public triggerSnapshot(): void {
    console.log("triggerSnapshot")
    if (this.isOnCamera) {
      this.trigger.next();
    }
  }

  public volverTomarFoto(): void{
    this.credencialSrc = "";
    this.onCamera(); 
  }

  public handleImage(event: WebcamImage | Event): void {
    if (event instanceof WebcamImage) {
      this.credencialSrc = event.imageAsDataUrl
      console.log("this.credencialSrc:", this.credencialSrc)
      const imgElement = document.createElement('img');
      imgElement.src = event.imageAsDataUrl;
      imgElement.width = 300;
      imgElement.height = 300;
      imgElement.style.objectFit = "contain";
      imgElement.style.borderRadius = "10px"

      const cameraView = document.getElementById('camera-view');
      if (cameraView) {
        cameraView.innerHTML = '';
        cameraView.appendChild(imgElement);
      }

      this.isOnCamera = false;
    } else {
      console.error('Evento recibido no es una imagen de webcam', event);
    }
  }

  public get triggerObservable(): Observable<void> {
    console.log("triggerObservable:")
    return this.trigger.asObservable();
  }

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);
  }

  public onSubmit() {
    if (this.pacienteForm.invalid) {
      return;
    }

    const item = {
      nombre_completo: this.pacienteForm.get('nombre_completo')?.value,
      /*  fecha_de_nacimiento :  this.pacienteForm.get("fecha_de_nacimiento")?.value,
      genero :  this.pacienteForm.get("genero")?.value,
      estado_civil :  this.pacienteForm.get("estado_civil")?.value,
      ocupacion :  this.pacienteForm.get("ocupacion")?.value,
      domicilio:  this.pacienteForm.get("domicilio")?.value,
      telefono:  this.pacienteForm.get("telefono")?.value,
      ciudad_origen:  this.pacienteForm.get("ciudad_origen")?.value,
      estado_origen:  this.pacienteForm.get("estado_origen")?.value,
      pais_origen:  this.pacienteForm.get("pais_origen")?.value,
      ciudad_Actual:  this.pacienteForm.get("ciudad_Actual")?.value,
      nombre_contacto_emergencia:  this.pacienteForm.get("nombre_contacto_emergencia")?.value,
      parentesco_contacto_emergencia:  this.pacienteForm.get("parentesco_contacto_emergencia")?.value,
      telefono_contacto_emergencia:  this.pacienteForm.get("telefono_contacto_emergencia")?.value, */
      historia_clinica_id: '',
    };

    this.apiSevice.createPacienteAndHistoriaClinica(item).subscribe(
      (response: any) => {
        console.log('Usuario registrado con éxito', response);
        this.pacienteForm.reset();
        this._general.navigateBy(
          `/trabajador/consultas/nuevo?patientCreated=true&nombre=${item.nombre_completo}&historia_id=${response.item.historia_clinica_id}`
        );
      },
      (error: any) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }
}
