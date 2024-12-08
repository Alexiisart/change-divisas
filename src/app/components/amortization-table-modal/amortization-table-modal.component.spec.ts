import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationTableModalComponent } from './amortization-table-modal.component';

describe('AmortizationTableModalComponent', () => {
  let component: AmortizationTableModalComponent;
  let fixture: ComponentFixture<AmortizationTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmortizationTableModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizationTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
