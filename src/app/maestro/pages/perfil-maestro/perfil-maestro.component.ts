import { Component } from '@angular/core';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-perfil-maestro',
  templateUrl: './perfil-maestro.component.html',
  styleUrls: ['./perfil-maestro.component.scss']
})
export class PerfilMaestroComponent {
  constructor(public _general:GeneralService){}
}
