import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-24 text-center">
      <div class="container">
        <p class="section-eyebrow">404</p>
        <h1 class="text-5xl font-bold mb-4">Pagina nu există</h1>
        <p class="text-muted-foreground mb-8">Linkul accesat nu este disponibil.</p>
        <a routerLink="/" class="btn btn-primary">Înapoi acasă</a>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
