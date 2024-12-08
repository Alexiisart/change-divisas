import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

@Component({
  selector: 'app-amortization-table-modal',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './amortization-table-modal.component.html',
  styleUrls: ['./amortization-table-modal.component.css'],
})
export class AmortizationTableModalComponent {
  @Input() amortizationTable: AmortizationRow[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() downloadPDF = new EventEmitter<void>();
  @Output() downloadExcel = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onDownloadPDF() {
    this.downloadPDF.emit();
  }

  onDownloadExcel() {
    this.downloadExcel.emit();
  }
}
