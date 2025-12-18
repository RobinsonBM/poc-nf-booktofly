import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsWrapperComponent } from './flights-wrapper.component';

describe('FlightsWrapperComponent', () => {
  let component: FlightsWrapperComponent;
  let fixture: ComponentFixture<FlightsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
