import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmortizationTableModalComponent } from '../components/amortization-table-modal/amortization-table-modal.component';
import { RouterModule } from '@angular/router';
import pdfMake from '../config/pdfmake.config';
import * as XLSX from 'xlsx';
import { NumberFormatDirective } from '../directives/number-format.directive';
import { defaultStyles } from '../config/pdfmake.config';
import { logoBase64 } from '../config/images.config';
import { ModalCommingSoonComponent } from '../components/modal-comming-soon/modal-comming-soon.component';

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AmortizationTableModalComponent,
    NumberFormatDirective,
    ModalCommingSoonComponent,
  ],
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
})
export class LoanCalculatorComponent {
  amount: string = '';
  years: string = '';
  annualRate: string = '';
  amortizationTable: AmortizationRow[] = [];
  isModalVisible = false;
  showModal = false;

  calculate() {
    const monthlyRate = parseFloat(this.annualRate) / 12 / 100;
    const numberOfPayments = parseFloat(this.years) * 12;
    const monthlyPayment = this.calculateMonthlyPayment(
      parseFloat(this.amount),
      monthlyRate,
      numberOfPayments
    );

    this.generateAmortizationTable(monthlyPayment, monthlyRate);
  }

  calculateMonthlyPayment(
    principal: number,
    monthlyRate: number,
    numberOfPayments: number
  ): number {
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  }

  generateAmortizationTable(monthlyPayment: number, monthlyRate: number) {
    this.amortizationTable = [];
    let balance = parseFloat(this.amount);

    for (let period = 1; period <= parseFloat(this.years) * 12; period++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;

      this.amortizationTable.push({
        period,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }
  }

  clear() {
    this.amount = '';
    this.years = '';
    this.annualRate = '';
    this.amortizationTable = [];
  }

  // Configuración de la fecha y logo
  logoBase64 = logoBase64;
  fecha = new Date()
    .toLocaleDateString('es-DO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(',', '');

  async downloadPDF() {
    const docDefinition: any = {
      pageSize: 'letter',
      pageOrientation: 'landscape',
      background: function (currentPage: any, pageSize: any) {
        return {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: pageSize.width,
              h: pageSize.height,
              color: '#e1e8ec',
            },
          ],
        };
      },
      content: [
        { image: this.logoBase64, width: 150, alignment: 'center' },
        { text: ' ', margin: [0, 5] }, // Adding space
        {
          text: this.fecha,
          alignment: 'right',
          fontSize: 10,
          color: '#24505c',
        },
        {
          text: 'Datos de tu préstamo',
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Período', style: 'tableHeader' },
                { text: 'Cuota', style: 'tableHeader' },
                { text: 'Principal', style: 'tableHeader' },
                { text: 'Interés', style: 'tableHeader' },
                { text: 'Balance', style: 'tableHeader' },
              ],
              ...this.amortizationTable.map((row) => [
                { text: row.period, style: 'tableCell' },
                {
                  text: new Intl.NumberFormat('es-DO', {
                    minimumFractionDigits: 2,
                  }).format(row.payment),
                  style: 'tableCell',
                },
                {
                  text: new Intl.NumberFormat('es-DO', {
                    minimumFractionDigits: 2,
                  }).format(row.principal),
                  style: 'tableCell',
                },
                {
                  text: new Intl.NumberFormat('es-DO', {
                    minimumFractionDigits: 2,
                  }).format(row.interest),
                  style: 'tableCell',
                },
                {
                  text: new Intl.NumberFormat('es-DO', {
                    minimumFractionDigits: 2,
                  }).format(row.balance),
                  style: 'tableCell',
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return rowIndex === 0 ? '#CCCCCC' : null;
            },
            hLineColor: function (i: any, node: any) {
              return '#24505c'; // Color de las líneas horizontales
            },
            vLineColor: function (i: any, node: any) {
              return '#24505c'; // Color de las líneas verticales
            },
          },
        },
      ],
      defaultStyle: {
        font: 'Roboto',
      },
      styles: defaultStyles,
    };

    pdfMake.createPdf(docDefinition).download('tabla_amortizacion.pdf');
  }

  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.amortizationTable.map((row) => ({
        Período: row.period,
        Cuota: row.payment.toFixed(2),
        Principal: row.principal.toFixed(2),
        Interés: row.interest.toFixed(2),
        Balance: row.balance.toFixed(2),
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Amortización');
    XLSX.writeFile(wb, 'amortizacion.xlsx');
  }

  showAmortizationTable() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  async onDownloadPDF() {
    await this.downloadPDF();
  }

  closeModalPress() {
    this.showModal = false;
  }
}

