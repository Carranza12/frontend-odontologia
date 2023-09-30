import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPermiseComponent } from './not-permise.component';

describe('NotPermiseComponent', () => {
  let component: NotPermiseComponent;
  let fixture: ComponentFixture<NotPermiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotPermiseComponent]
    });
    fixture = TestBed.createComponent(NotPermiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
