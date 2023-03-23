import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceComponent } from './preduzece.component';

describe('PreduzeceComponent', () => {
  let component: PreduzeceComponent;
  let fixture: ComponentFixture<PreduzeceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
