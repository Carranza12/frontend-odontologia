import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAuthComponent } from './menu-auth.component';

describe('MenuAuthComponent', () => {
  let component: MenuAuthComponent;
  let fixture: ComponentFixture<MenuAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAuthComponent]
    });
    fixture = TestBed.createComponent(MenuAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
