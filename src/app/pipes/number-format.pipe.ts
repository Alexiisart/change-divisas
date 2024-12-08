import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';

    // Convertir el número a string con 2 decimales
    const parts = value.toFixed(2).split('.');

    // Formatear la parte entera con comas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Unir la parte entera y decimal
    return parts.join('.');
  }
} 