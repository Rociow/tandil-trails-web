import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderoDetalle } from './sendero-detalle';

describe('SenderoDetalle', () => {
  let component: SenderoDetalle;
  let fixture: ComponentFixture<SenderoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderoDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(SenderoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
