import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private _router: Router) { }

  public navigateBy(url: string) {
    this._router.navigateByUrl(url);
  }
}
