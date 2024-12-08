import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-comming-soon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-comming-soon.component.html',
  styleUrls: ['./modal-comming-soon.component.css'],
})
export class ModalCommingSoonComponent {
  @Output() closeModal = new EventEmitter<void>();
  isVisible = true;

  close() {
    this.closeModal.emit();
  }
}
