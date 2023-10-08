import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-perfil-maestro',
  templateUrl: './perfil-maestro.component.html',
  styleUrls: ['./perfil-maestro.component.scss']
})
export class PerfilMaestroComponent {
  public perfilMaestroForm = this.formBuilder.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    password: ['', Validators.required],
    role_default: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profileImage: [''],
  });

  constructor(public _general:GeneralService,  private formBuilder: FormBuilder,){}
}
