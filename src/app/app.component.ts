import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ChangeDivisas';
}
