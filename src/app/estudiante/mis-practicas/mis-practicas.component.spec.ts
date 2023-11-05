import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPracticasComponent } from './mis-practicas.component';

describe('MisPracticasComponent', () => {
  let component: MisPracticasComponent;
  let fixture: ComponentFixture<MisPracticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisPracticasComponent]
    });
    fixture = TestBed.createComponent(MisPracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
