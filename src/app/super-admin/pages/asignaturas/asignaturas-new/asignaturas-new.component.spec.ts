import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasNewComponent } from './asignaturas-new.component';

describe('AsignaturasNewComponent', () => {
  let component: AsignaturasNewComponent;
  let fixture: ComponentFixture<AsignaturasNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturasNewComponent]
    });
    fixture = TestBed.createComponent(AsignaturasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
