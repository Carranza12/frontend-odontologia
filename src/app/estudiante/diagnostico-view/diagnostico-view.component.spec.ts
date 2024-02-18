import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoViewComponent } from './diagnostico-view.component';

describe('DiagnosticoViewComponent', () => {
  let component: DiagnosticoViewComponent;
  let fixture: ComponentFixture<DiagnosticoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticoViewComponent]
    });
    fixture = TestBed.createComponent(DiagnosticoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
