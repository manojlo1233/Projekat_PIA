import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledRacunaComponent } from './pregled-racuna.component';

describe('PregledRacunaComponent', () => {
  let component: PregledRacunaComponent;
  let fixture: ComponentFixture<PregledRacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledRacunaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
