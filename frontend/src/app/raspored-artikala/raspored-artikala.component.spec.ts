import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedArtikalaComponent } from './raspored-artikala.component';

describe('RasporedArtikalaComponent', () => {
  let component: RasporedArtikalaComponent;
  let fixture: ComponentFixture<RasporedArtikalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedArtikalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedArtikalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
