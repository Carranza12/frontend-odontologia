import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
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

  canvasWidth: number = 800;
  canvasHeight: number = 600;

  public diagnosticoForm = this.formBuilder.group({
    motivos_de_la_consulta: new FormControl(''),
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
    evidencia1: new FormControl(''),
    evidencia2: new FormControl(''),
    evidencia3: new FormControl(''),
    evidencia4: new FormControl(''),
    evidencia5: new FormControl(''),
  });

  public historia_clinica_id: any = '';

  public item: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);

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
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeStyle = 'gray';
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

  startDrawing(event: MouseEvent): void {
    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  draw(event: MouseEvent): void {
    if (this.isDrawing) {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }

  endDrawing(): void {
    this.isDrawing = false;
  }

  public viewEvidencia(url: string) {
    window.open(url, '_blank');
  }

  public async onSubmit() {
    const result = await Swal.fire({
      title: '¿Estás seguro de crear el diagnostico? una vez creado, NO podra ser editado.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });

    if (result.isConfirmed) {
      try {
        const odontograma = this.canvas.nativeElement.toDataURL('image/png');

        const item = {
          ...this.diagnosticoForm.value,
          odontograma,
          historia_clinica_id: this.historia_clinica_id,
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

  async onFileSelected(event: Event, type: String) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'evidencia1')
        this.diagnosticoForm.controls['evidencia1'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia2')
        this.diagnosticoForm.controls['evidencia2'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia3')
        this.diagnosticoForm.controls['evidencia3'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia4')
        this.diagnosticoForm.controls['evidencia4'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia5')
        this.diagnosticoForm.controls['evidencia5'].setValue(
          await this.fileToBase64(input.files[0])
        );
    }
  }
}
