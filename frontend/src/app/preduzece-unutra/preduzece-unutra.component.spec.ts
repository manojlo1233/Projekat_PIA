import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceUnutraComponent } from './preduzece-unutra.component';

describe('PreduzeceUnutraComponent', () => {
  let component: PreduzeceUnutraComponent;
  let fixture: ComponentFixture<PreduzeceUnutraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzeceUnutraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreduzeceUnutraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
