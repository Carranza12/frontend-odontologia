import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMaestroComponent } from './perfil-maestro.component';

describe('PerfilMaestroComponent', () => {
  let component: PerfilMaestroComponent;
  let fixture: ComponentFixture<PerfilMaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilMaestroComponent]
    });
    fixture = TestBed.createComponent(PerfilMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
