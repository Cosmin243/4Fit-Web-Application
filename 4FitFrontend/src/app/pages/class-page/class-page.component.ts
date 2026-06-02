import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type ClassInfo = {
  title: string;
  description: string;
  cards: { icon: string; title: string; desc: string }[];
  schedule: string[];
};

const classes: Record<string, ClassInfo> = {
  aerobic: {
    title: 'Aerobic',
    description: 'Cursurile noastre de aerobic combina miscari ritmice pe muzica energizanta, ideale pentru arderea caloriilor si imbunatatirea rezistentei cardiovasculare.',
    cards: [
      { icon: 'pi pi-heart', title: 'Cardio intens', desc: 'Antrenament care imbunatateste sanatatea inimii.' },
      { icon: 'pi pi-volume-up', title: 'Muzica energizanta', desc: 'Ritmuri care te motiveaza pe parcursul intregii sedinte.' },
      { icon: 'pi pi-bolt', title: 'Ardere calorica', desc: 'Pana la 600 calorii arse per sedinta de 60 minute.' }
    ],
    schedule: ['Luni, Miercuri, Vineri - 18:00 - 19:00', 'Marti, Joi - 10:00 - 11:00']
  },
  karate: {
    title: 'Karate',
    description: 'Cursuri de karate pentru toate varstele si nivelurile, predate de instructori cu centura neagra. Disciplina, forta si incredere in sine.',
    cards: [
      { icon: 'pi pi-star', title: 'Tehnica autentica', desc: 'Karate traditional Shotokan predat de maestri certificati.' },
      { icon: 'pi pi-shield', title: 'Auto-aparare', desc: 'Tehnici practice de protectie personala.' },
      { icon: 'pi pi-trophy', title: 'Sistem de grade', desc: 'Examinari periodice pentru avansare in centuri.' }
    ],
    schedule: ['Marti, Joi - 17:00 - 18:30 (adulti)', 'Sambata - 10:00 - 11:30 (copii)']
  },
  yoga: {
    title: 'Yoga',
    description: 'Cursurile noastre de yoga ofera un echilibru perfect intre corp si minte, cu sesiuni de Hatha, Vinyasa si Yin Yoga.',
    cards: [
      { icon: 'pi pi-sparkles', title: 'Flexibilitate', desc: 'Imbunatatirea mobilitatii si elasticitatii corpului.' },
      { icon: 'pi pi-moon', title: 'Echilibru mental', desc: 'Tehnici de respiratie si meditatie pentru reducerea stresului.' },
      { icon: 'pi pi-sun', title: 'Energie pozitiva', desc: 'Sesiuni care te revitalizeaza fizic si emotional.' }
    ],
    schedule: ['Luni, Miercuri - 08:00 - 09:00 (Hatha)', 'Marti, Joi - 19:00 - 20:00 (Vinyasa)', 'Sambata - 09:00 - 10:30 (Yin Yoga)']
  },
  pilates: {
    title: 'Pilates',
    description: 'Pilates se concentreaza pe intarirea muschilor profunzi, imbunatatirea posturii si cresterea flexibilitatii, intr-un mediu relaxant.',
    cards: [
      { icon: 'pi pi-chart-bar', title: 'Core puternic', desc: 'Exercitii care intaresc musculatura abdominala si lombara.' },
      { icon: 'pi pi-compass', title: 'Postura corecta', desc: 'Corectarea dezechilibrelor posturale.' },
      { icon: 'pi pi-face-smile', title: 'Low impact', desc: 'Exercitii blande cu articulatiile, potrivite pentru oricine.' }
    ],
    schedule: ['Luni, Miercuri, Vineri - 09:00 - 10:00', 'Marti, Joi - 17:00 - 18:00']
  },
  zumba: {
    title: 'Zumba',
    description: 'Zumba este un antrenament de dans plin de energie care combina ritmuri latino cu miscari de fitness, transformand exercitiul fizic intr-o petrecere.',
    cards: [
      { icon: 'pi pi-volume-up', title: 'Ritmuri latino', desc: 'Salsa, merengue, cumbia si reggaeton.' },
      { icon: 'pi pi-gift', title: 'Distractie garantata', desc: 'Atmosfera de petrecere la fiecare sedinta.' },
      { icon: 'pi pi-bolt', title: 'Fitness distractiv', desc: 'Arzi calorii fara sa simti ca te antrenezi.' }
    ],
    schedule: ['Luni, Miercuri - 19:00 - 20:00', 'Sambata - 11:00 - 12:00']
  }
};

@Component({
  selector: 'app-class-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './class-page.component.html'
})
export class ClassPageComponent {
  page: ClassInfo;

  constructor(route: ActivatedRoute) {
    this.page = classes[route.snapshot.routeConfig?.path ?? 'aerobic'] ?? classes['aerobic'];
  }
}
