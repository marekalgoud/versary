import { Component, inject, model } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  date = model<string>();
  router = inject(Router);

  onSubmit() {
    this.router.navigate(['/result', this.date()]);
  }
}
