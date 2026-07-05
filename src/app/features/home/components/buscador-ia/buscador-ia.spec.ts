import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorIa } from './buscador-ia';

describe('BuscadorIa', () => {
  let component: BuscadorIa;
  let fixture: ComponentFixture<BuscadorIa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorIa],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorIa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
