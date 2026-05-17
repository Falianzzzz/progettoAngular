import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fiat } from './fiat';

describe('Fiat', () => {
  let component: Fiat;
  let fixture: ComponentFixture<Fiat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fiat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fiat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
