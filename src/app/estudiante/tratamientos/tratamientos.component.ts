import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.scss']
})

export class TratamientosComponent {

  
  public tratamientoForm = this.formBuilder.group({
    tratamiento: new FormControl(''),
    alumno: new FormControl(''),
    matricula: new FormControl(''),
    expediente: new FormControl(''),
    fecha_tratamiento: new FormControl(''),
    observaciones: new FormControl(''),
    evidencia1: new FormControl(''),
    evidencia2: new FormControl(''),
    evidencia3: new FormControl(''),
    evidencia4: new FormControl(''),
    evidencia5: new FormControl(''),
  });
  public async onSubmit() {
    const result = await Swal.fire({
      title: '¿Estás seguro de crear? Una vez creado, NO podra ser editado.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    });
  }
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
    if(user){
      console.log(user);
      this.tratamientoForm.controls.alumno.setValue(user.fullName);
    }
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      this.historia_clinica_id = params['id'];
      this.apiSevice
        .getHistoriaClinica(this.historia_clinica_id)
        .subscribe((res: any) => {
          this.item = res.item;
          console.log('ITEM:', this.item);
        });
    });
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
        this.tratamientoForm.controls['evidencia1'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia2')
        this.tratamientoForm.controls['evidencia2'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia3')
        this.tratamientoForm.controls['evidencia3'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia4')
        this.tratamientoForm.controls['evidencia4'].setValue(
          await this.fileToBase64(input.files[0])
        );
      if (type === 'evidencia5')
        this.tratamientoForm.controls['evidencia5'].setValue(
          await this.fileToBase64(input.files[0])
        );
    }
  }
}
