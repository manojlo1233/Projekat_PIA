import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaruciociComponent } from './narucioci.component';

describe('NaruciociComponent', () => {
  let component: NaruciociComponent;
  let fixture: ComponentFixture<NaruciociComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaruciociComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaruciociComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
