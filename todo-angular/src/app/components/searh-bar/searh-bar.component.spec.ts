import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhBarComponent } from './searh-bar.component';

describe('SearhBarComponent', () => {
  let component: SearhBarComponent;
  let fixture: ComponentFixture<SearhBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
