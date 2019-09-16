import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessWindowComponent } from './success-window.component';

describe('SuccessWindowComponent', () => {
  let component: SuccessWindowComponent;
  let fixture: ComponentFixture<SuccessWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
