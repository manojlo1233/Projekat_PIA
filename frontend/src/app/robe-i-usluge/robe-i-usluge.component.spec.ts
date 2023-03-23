import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobeIUslugeComponent } from './robe-i-usluge.component';

describe('RobeIUslugeComponent', () => {
  let component: RobeIUslugeComponent;
  let fixture: ComponentFixture<RobeIUslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobeIUslugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobeIUslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
