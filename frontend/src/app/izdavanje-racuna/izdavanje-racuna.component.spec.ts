import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzdavanjeRacunaComponent } from './izdavanje-racuna.component';

describe('IzdavanjeRacunaComponent', () => {
  let component: IzdavanjeRacunaComponent;
  let fixture: ComponentFixture<IzdavanjeRacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzdavanjeRacunaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzdavanjeRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
