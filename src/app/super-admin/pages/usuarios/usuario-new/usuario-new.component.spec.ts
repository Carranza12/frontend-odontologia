import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNewComponent } from './usuario-new.component';

describe('UsuarioNewComponent', () => {
  let component: UsuarioNewComponent;
  let fixture: ComponentFixture<UsuarioNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioNewComponent]
    });
    fixture = TestBed.createComponent(UsuarioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
