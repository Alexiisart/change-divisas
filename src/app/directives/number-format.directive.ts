import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberFormat]',
  standalone: true,
})
export class NumberFormatDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    // Eliminar todas las comas existentes y caracteres no numéricos excepto el punto
    let value = input.value.replace(/,/g, '').replace(/[^\d.]/g, '');

    // Asegurarse de que solo haya un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      parts.splice(2);
      value = parts.join('.');
    }

    // Convertir a número para el modelo
    const numericValue = parseFloat(value) || 0;

    // Actualizar el modelo con el valor numérico
    if (this.control.control) {
      this.control.control.setValue(numericValue, { emitEvent: false });
    }

    // Formatear para la visualización
    if (value) {
      if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      input.value = parts.join('.');
    }
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement;
    const value = input.value.replace(/,/g, '');
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      // Formatear con comas y dos decimales
      input.value = numericValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }
}
