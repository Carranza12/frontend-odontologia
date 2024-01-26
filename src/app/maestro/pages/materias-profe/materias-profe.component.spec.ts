import { ComponentFixture, TestBed } from '@angular/core/testing';

import { materiasProfeComponent } from './materias-profe.component';

describe('materiasProfeComponent', () => {
  let component: materiasProfeComponent;
  let fixture: ComponentFixture<materiasProfeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [materiasProfeComponent]
    });
    fixture = TestBed.createComponent(materiasProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
