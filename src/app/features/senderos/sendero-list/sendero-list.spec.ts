import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderoList } from './sendero-list';

describe('SenderoList', () => {
  let component: SenderoList;
  let fixture: ComponentFixture<SenderoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenderoList],
    }).compileComponents();

    fixture = TestBed.createComponent(SenderoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
