import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedStolovaComponent } from './raspored-stolova.component';

describe('RasporedStolovaComponent', () => {
  let component: RasporedStolovaComponent;
  let fixture: ComponentFixture<RasporedStolovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedStolovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedStolovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
