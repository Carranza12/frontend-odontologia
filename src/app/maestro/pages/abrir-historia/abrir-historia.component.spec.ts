import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirHistoriaComponent } from './abrir-historia.component';

describe('AbrirHistoriaComponent', () => {
  let component: AbrirHistoriaComponent;
  let fixture: ComponentFixture<AbrirHistoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirHistoriaComponent]
    });
    fixture = TestBed.createComponent(AbrirHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
