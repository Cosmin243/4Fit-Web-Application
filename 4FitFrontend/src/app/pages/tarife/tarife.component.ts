import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Plan = { category: string; name: string; price: string; per: string; features: string[]; highlight?: boolean; anchor: string };

@Component({
  selector: 'app-tarife',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tarife.component.html'
})
export class TarifeComponent {
  plans: Plan[] = [
    { category: 'Fitness', name: 'Lunar', price: '149', per: '/lună', anchor: 'sala-fitness', features: ['Acces sală de forță', 'Zona cardio', 'Vestiare & dușuri'] },
    { category: 'Fitness', name: 'Premium', price: '199', per: '/lună', anchor: 'sala-fitness', highlight: true, features: ['Tot ce include Lunar', 'Clase de grup nelimitate', 'Evaluare inițială gratuită', '1 ședință antrenor/lună'] },
    { category: 'Fitness', name: 'Anual', price: '139', per: '/lună', anchor: 'sala-fitness', features: ['Tot ce include Premium', 'Plată anuală', 'Economisești 720 lei/an'] },
    { category: 'Bazin', name: 'Intrare singulară', price: '45', per: '/ședință', anchor: 'bazin', features: ['Acces bazin 1.5h', 'Vestiare & dușuri'] },
    { category: 'Bazin', name: 'Abonament lunar', price: '199', per: '/lună', anchor: 'bazin', highlight: true, features: ['Acces nelimitat bazin', 'Vestiare & dușuri', 'Saună inclusă'] },
    { category: 'Personal', name: 'Pachet 10 ședințe', price: '999', per: '', anchor: 'antrenor', highlight: true, features: ['10 ședințe x 60 min', 'Plan nutriție inclus', 'Monitorizare progres'] }
  ];
}
