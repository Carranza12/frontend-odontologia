import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisProfesoresComponent } from './mis-profesores.component';

describe('MisProfesoresComponent', () => {
  let component: MisProfesoresComponent;
  let fixture: ComponentFixture<MisProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisProfesoresComponent]
    });
    fixture = TestBed.createComponent(MisProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
