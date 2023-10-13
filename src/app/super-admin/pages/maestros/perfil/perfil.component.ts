import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgxSignatureOptions,
  NgxSignaturePadComponent,
} from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @ViewChild('signature') signature!: NgxSignaturePadComponent;
  public firmaImagen: string | null = null;

  public perfilForm = this.formBuilder.group({
    expediente: ['', Validators.required],
    cedula_profesional: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });

  public options: NgxSignatureOptions = {
    backgroundColor: '#F4F5F5',
    width: 570,
    height: 300,
    css: {
      'border-radius': '16px',
    },
  };

  constructor(
    public _general: GeneralService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    console.log(this.perfilForm);
    console.log('firma:', this.signature);
    if (this.perfilForm.valid) {
      let formPerfil: any = this.perfilForm.value;

      const formData = new FormData();

      formData.append('expediente', formPerfil.expediente);
      formData.append('cedula_profesional', formPerfil.cedula_profesional);
      formData.append('universidad', formPerfil.universidad);
      formData.append('especialidad', formPerfil.especialidad);
      formData.append('firma', formPerfil.firma);

      console.log('data a enviar:', formData);
    }
  }

  onBeginSign(): void {
    console.log('on begin sing');
  }

  onEndSign(): void {
    if (this.signature) {
      this.firmaImagen = this.signature.toDataURL();
    }
  }
}
