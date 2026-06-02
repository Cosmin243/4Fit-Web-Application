import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  sent = false;
  form = { name: '', email: '', message: '' };

  submit(): void {
    this.sent = true;
    this.form = { name: '', email: '', message: '' };
  }
}
