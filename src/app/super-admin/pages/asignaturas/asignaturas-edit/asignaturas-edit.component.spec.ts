import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasEditComponent } from './asignaturas-edit.component';

describe('AsignaturasEditComponent', () => {
  let component: AsignaturasEditComponent;
  let fixture: ComponentFixture<AsignaturasEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturasEditComponent]
    });
    fixture = TestBed.createComponent(AsignaturasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
