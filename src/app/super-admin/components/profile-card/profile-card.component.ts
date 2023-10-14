import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit{
  public user: any = {};
  constructor(private _route:ActivatedRoute, private _usuario:ApiService){}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      this._usuario.getUser(id).subscribe(
        (data: any) => {
          if (data) {
            this.user = data;
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }

}
