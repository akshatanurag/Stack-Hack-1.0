import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerSmComponent } from './spinner-sm.component';

describe('SpinnerSmComponent', () => {
  let component: SpinnerSmComponent;
  let fixture: ComponentFixture<SpinnerSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
