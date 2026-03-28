import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderoCard } from './sendero-card';

describe('SenderoCard', () => {
  let component: SenderoCard;
  let fixture: ComponentFixture<SenderoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SenderoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
