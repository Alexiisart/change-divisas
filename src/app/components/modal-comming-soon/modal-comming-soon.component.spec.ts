import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCommingSoonComponent } from './modal-comming-soon.component';

describe('ModalCommingSoonComponent', () => {
  let component: ModalCommingSoonComponent;
  let fixture: ComponentFixture<ModalCommingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCommingSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCommingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
