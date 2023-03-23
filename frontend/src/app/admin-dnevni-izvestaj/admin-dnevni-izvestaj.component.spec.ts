import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDnevniIzvestajComponent } from './admin-dnevni-izvestaj.component';

describe('AdminDnevniIzvestajComponent', () => {
  let component: AdminDnevniIzvestajComponent;
  let fixture: ComponentFixture<AdminDnevniIzvestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDnevniIzvestajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDnevniIzvestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
