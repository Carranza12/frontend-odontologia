import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { EvidenciaModalComponent } from 'src/app/components/evidencia-modal/evidencia-modal.component';
import { PacienteService } from 'src/app/empleado/services/paciente.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
import { EvidenciaModalService } from 'src/app/services/evidencia-modal.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss'],
})
export class DiagnosticoComponent implements OnInit {
  @ViewChild('canvas') canvas: any;
  ctx: any;
  isDrawing: boolean = false;
  showOtherReason = false;
  options: string[] = [];
  context: CanvasRenderingContext2D | null = null;
  penColor = '#000000';
  penThickness: number = 0;
  selectedTool = 'pen';
  canvasWidth: number = 700;
  canvasHeight: number = 600;
  selectedColor: string = '#000000';
  trazos: { color: string; grosor: number; trazo: Path2D }[] = [];
  backgroundImage: HTMLImageElement = new Image();

  clinics: any = [];

  selectedClinicIds: string[] = [];

  public diagnosticoForm = this.formBuilder.group({
    motivos_de_la_consulta: new FormControl(''),
    clinica: new FormControl(''),
    fecha_de_la_consulta: new FormControl(''),
    comentarios_sobre_la_consulta: new FormControl(''),
    cabeza_craneo: new FormControl(''),
    cabeza_cara: new FormControl(''),
    boca_labios: new FormControl(''),
    boca_carrillos: new FormControl(''),
    boca_encia: new FormControl(''),
    boca_piso_de_boca: new FormControl(''),
    boca_lengua: new FormControl(''),
    boca_paladar: new FormControl(''),
    atm: new FormControl(''),
    atm_anexos: new FormControl(''),
    atm_macizo_oseo: new FormControl(''),
    cuello: new FormControl(''),
    torax: new FormControl(''),
    abdomen: new FormControl(''),
    extremidades: new FormControl(''),
    examenes_de_laboratorio: new FormControl(''),
    diagnostico: new FormControl(''),
    observaciones: new FormControl(''),
    paciente_referido_clinica: new FormControl(''),
    conducta_agradable: [false],
    conducta_ansioso: [false],
    conducta_reticente: [false],
    conducta_hipocondriaco: [false],
    conducta_desinformado: [false],
    conducta_inapropiado: [false],
  });
  public evidencias: any = [];

  public historia_clinica_id: any = '';
  public alumno_id: any = '';

  public item: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private pacienteService: PacienteService,
    private evidenciaModal: EvidenciaModalService,
  ) { }

  toggleSelection(clinicId: string): void {
    const index = this.selectedClinicIds.indexOf(clinicId);
    if (index === -1) {
      this.selectedClinicIds.push(clinicId);
    } else {
      this.selectedClinicIds.splice(index, 1);
    }

    console.log('CLINICAS SELECCIONADAS:', this.selectedClinicIds);
    this.diagnosticoForm.controls.clinica.setValue(
      JSON.stringify(this.selectedClinicIds) || ''
    );
  }

  isClinicSelected(clinicId: string): boolean {
    return this.selectedClinicIds.includes(clinicId);
  }


  ngOnInit(): void {
    this.pacienteService.getAllClinicas().subscribe(
      (data: any) => {
        if (Array.isArray(data.items)) {
          this.clinics = data.items;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );

    //madre del canvas
    this.backgroundImage.src = '../../../assets/logos/odontograma.jpg';
    this.backgroundImage.onload = () => {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    };

    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      this.alumno_id = user.user_id;
    }

    this.route.params.subscribe((params) => {
      this.historia_clinica_id = params['id'];
      this.apiSevice
        .getHistoriaClinica(this.historia_clinica_id)
        .subscribe((res: any) => {
          this.item = res.item;
          console.log('ITEM:', this.item);
        });
    });
  }


  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.src = '../../../assets/logos/odontograma.jpg';
    backgroundImage.onload = () => {
      this.ctx.drawImage(
        backgroundImage,
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    };
  }

  //Funcion para limpiar el canva
  clearCanvas() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      const backgroundImage = new Image();
      backgroundImage.src = '../../../assets/logos/odontograma.jpg';
      backgroundImage.onload = () => {
        this.ctx.drawImage(
          backgroundImage,
          0,
          0,
          this.canvas.nativeElement.width,
          this.canvas.nativeElement.height
        );
      };
      this.trazos = [];
    }
  }

  cambiarGrosor(nuevoGrosor: number): void {
    this.penThickness = nuevoGrosor;
    this.ctx.lineWidth = this.penThickness;
  }

  seleccionarGrosor(grosor: number): void {
    this.cambiarGrosor(grosor);
  }

  cambiarColor(nuevoColor: string): void {
    this.selectedColor = nuevoColor;
    this.ctx.strokeStyle = this.penColor;
  }

  seleccionarColor(color: string): void {
    this.cambiarColor(color);
  }

  startDrawing(event: MouseEvent, color: string, grosor: number): void {
    this.isDrawing = true;
    const nuevoTrazo = new Path2D();
    nuevoTrazo.moveTo(event.offsetX, event.offsetY);
    this.trazos.push({ trazo: nuevoTrazo, color: color, grosor: grosor });
  }

  draw(event: MouseEvent): void {
    if (this.isDrawing) {
      const trazoActual = this.trazos[this.trazos.length - 1];
      trazoActual.trazo.lineTo(event.offsetX, event.offsetY);
      this.ctx.strokeStyle = trazoActual.color; // Aplicar el color correcto al lápiz
      this.ctx.lineWidth = trazoActual.grosor; // Establecer el grosor correcto
      this.ctx.stroke(trazoActual.trazo);
    }
  }

  endDrawing(): void {
    this.isDrawing = false;
  }

  regresarUltimoTrazo(): void {
    // Verifica que haya al menos un trazo para deshacer
    if (this.trazos.length > 0) {
      // Elimina el último trazo de la lista
      this.trazos.pop();

      // Limpia el lienzo antes de volver a dibujar la imagen de fondo
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Dibuja la imagen de fondo
      const backgroundImage = new Image();
      backgroundImage.src = '../../../assets/logos/odontograma.jpg';
      backgroundImage.onload = () => {
        this.ctx.drawImage(
          backgroundImage,
          0,
          0,
          this.canvas.nativeElement.width,
          this.canvas.nativeElement.height
        );

        // Dibuja los trazos restantes encima de la imagen de fondo
        this.trazos.forEach((trazoData) => {
          this.ctx.strokeStyle = trazoData.color;
          this.ctx.lineWidth = trazoData.grosor;
          this.ctx.stroke(trazoData.trazo);
        });
      };
    }
  }

  public viewEvidencia(url: string) {
    window.open(url, '_blank');
  }

  public async onSubmit() {
    const result = await Swal.fire({
      title:
        '¿Estás seguro de crear el diagnostico? una vez creado, NO podra ser editado.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (result.isConfirmed) {
      try {
        if (!this.diagnosticoForm.controls.clinica.value) {
          Swal.fire('Oops...', 'El campo Clinica es obligatorio...', 'error');
          return;
        }

        if (!this.diagnosticoForm.controls.observaciones.value) {
          Swal.fire(
            'Oops...',
            'El campo observaciones es obligatorio...',
            'error'
          );
          return;
        }

        if (!this.diagnosticoForm.controls.diagnostico.value) {
          Swal.fire(
            'Oops...',
            'El campo diagnostico es obligatorio...',
            'error'
          );
          return;
        }

        if (!this.diagnosticoForm.controls.motivos_de_la_consulta.value) {
          Swal.fire(
            'Oops...',
            'El campo Motivo de la consulta es obligatorio...',
            'error'
          );
          return;
        }

        if (!this.diagnosticoForm.controls.fecha_de_la_consulta.value) {
          Swal.fire(
            'Oops...',
            'El campo Fecha de la consulta es obligatorio...',
            'error'
          );
          return;
        }

        const odontograma = this.canvas.nativeElement.toDataURL('image/png');

        const item = {
          ...this.diagnosticoForm.value,
          odontograma,
          historia_clinica_id: this.historia_clinica_id,
          alumno_id: this.alumno_id,
          tratamiento_id: '',
          evidencias: this.evidencias
        };

        this.apiSevice.createDiagnostico(item).subscribe(
          (response: any) => {
            console.log('Diagnostico creado con exito', response);
            this.diagnosticoForm.reset();
            Swal.fire(
              'Diagnostico creado con exito',
              'En breve seras redirigido a la historia clinica del paciente',
              'success'
            );
            setTimeout(() => {
              this._general.navigateBy(
                `/estudiante/historia-clinica/edicion/${this.historia_clinica_id}`
              );
            }, 3000);
          },
          (error: any) => {
            console.error('Error al guardar la historia clinica', error);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
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

  async compressImage(file: File, quality: number): Promise<string> {
    const image = await this.loadImage(URL.createObjectURL(file));
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // Cambia 'jpeg' por 'png' si necesitas un formato diferente
    return compressedBase64;
  }

  async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  async convertImageToBase64(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    const compressedBase64 = await this.compressImage(file, quality);
    const img = new Image();
    img.src = compressedBase64;
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const resizedBase64 = canvas.toDataURL('image/jpeg', quality); // Cambia 'jpeg' por 'png' si necesitas un formato diferente
    return resizedBase64;
  }

  async onFileSelected(event: any) {
    const listaDeFiles = event.target.files;
    for await (const file of listaDeFiles) {
      if (!file.type.startsWith('image/')) {
        Swal.fire('Oops...', 'Solo se admiten imagenes como evidencias', 'warning');
        return;
      }

      const compressedBase64 = await this.compressImage(file, 0.1); // Cambia 0.5 por el nivel de compresión deseado (entre 0 y 1)


      const evidencia = {
        title: "",
        description: "",
        image: compressedBase64
      }
      this.evidencias.push(evidencia)
    }

  }

  openRellenarEvidencialModal(evidencia: any, index: number) {

    this.evidenciaModal.evidencia$.subscribe(respuesta => {
      console.log('Evidencia recibida en el componente que genera el Swal:', respuesta);
      this.evidencias[respuesta.id] = respuesta.evidencia
    });

    const domHTML = this.evidenciaModal.createHTMLModal(evidencia, index)


    Swal.fire({
      title: '',
      text: '',
      html: domHTML,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
      width: '550px',
      padding: '0',
      allowOutsideClick: false,
      customClass: {
        popup: 'custom-swal-modal'
      },

    });
  }

}
