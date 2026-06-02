import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type Feature = { icon: string; title: string; desc: string };
type Plan = { name: string; price: string; per: string; features: string[]; highlight: boolean };
type ServicePage = {
  eyebrow: string;
  title: string;
  image: string;
  description: string;
  featureTitle: string;
  features: Feature[];
  plans: Plan[];
  anchor: string;
};

const pages: Record<string, ServicePage> = {
  'sala-fitness': {
    eyebrow: 'Servicii',
    title: 'Sala de fitness',
    image: '/assets/service-fitness.jpg',
    description: 'Sala noastra de fitness este echipata cu aparate de ultima generatie, zona de greutati libere si spatiu dedicat pentru exercitii functionale.',
    featureTitle: 'Abonamente sala de fitness',
    anchor: 'sala-fitness',
    features: [
      { icon: 'pi pi-bolt', title: 'Greutati libere', desc: 'Gantere de la 1 la 60 kg, baruri olimpice si rack-uri de squat.' },
      { icon: 'pi pi-bullseye', title: 'Aparate ghidate', desc: 'Peste 40 de aparate pentru fiecare grupa musculara.' },
      { icon: 'pi pi-clock', title: 'Zona cardio', desc: 'Benzi de alergat, biciclete si aparate de vaslat.' }
    ],
    plans: [
      { name: 'Lunar', price: '149', per: '/luna', features: ['Acces sala de forta', 'Zona cardio', 'Vestiare & dusuri'], highlight: false },
      { name: 'Premium', price: '199', per: '/luna', features: ['Tot ce include Lunar', 'Clase de grup nelimitate', 'Evaluare initiala gratuita', '1 sedinta antrenor/luna'], highlight: true },
      { name: 'Anual', price: '139', per: '/luna', features: ['Tot ce include Premium', 'Plata anuala', 'Economisesti 720 lei/an'], highlight: false }
    ]
  },
  'bazin-inot': {
    eyebrow: 'Servicii',
    title: 'Bazin de inot',
    image: '/assets/service-pool.jpg',
    description: 'Bazinul nostru semi-olimpic de 25m este incalzit tot anul si disponibil atat pentru inot liber cat si pentru cursuri de grup.',
    featureTitle: 'Abonamente bazin',
    anchor: 'bazin',
    features: [
      { icon: 'pi pi-wave-pulse', title: '25m semi-olimpic', desc: '6 culoare pentru inot liber si antrenament.' },
      { icon: 'pi pi-sun', title: 'Apa incalzita', desc: 'Temperatura constanta de 28 grade tot anul.' },
      { icon: 'pi pi-users', title: 'Cursuri de inot', desc: 'Lectii pentru toate nivelurile, de la incepatori la avansati.' }
    ],
    plans: [
      { name: 'Intrare singulara', price: '45', per: '/sedinta', features: ['Acces bazin 1.5h', 'Vestiare & dusuri'], highlight: false },
      { name: 'Abonament lunar', price: '199', per: '/luna', features: ['Acces nelimitat bazin', 'Vestiare & dusuri', 'Sauna inclusa'], highlight: true },
      { name: 'Cursuri de inot', price: '249', per: '/luna', features: ['8 sedinte/luna', 'Instructor dedicat', 'Grupe mici (max 6)'], highlight: false }
    ]
  },
  'antrenor-personal': {
    eyebrow: 'Servicii',
    title: 'Antrenor personal',
    image: '/assets/service-trainer.jpg',
    description: 'Antrenorii nostri certificati creeaza programe personalizate adaptate obiectivelor tale.',
    featureTitle: 'Pachete antrenor personal',
    anchor: 'antrenor',
    features: [
      { icon: 'pi pi-user-plus', title: 'Antrenori certificati', desc: 'Experienta minima de 5 ani si certificari internationale.' },
      { icon: 'pi pi-list-check', title: 'Plan personalizat', desc: 'Program de antrenament si nutritie adaptat tie.' },
      { icon: 'pi pi-chart-line', title: 'Monitorizare progres', desc: 'Evaluari periodice si ajustarea planului.' }
    ],
    plans: [
      { name: 'Sedinta unica', price: '120', per: '/sedinta', features: ['60 minute', 'Program personalizat', 'Evaluare fizica'], highlight: false },
      { name: 'Pachet 10 sedinte', price: '999', per: '', features: ['10 sedinte x 60 min', 'Plan nutritie inclus', 'Monitorizare progres'], highlight: true },
      { name: 'Pachet 20 sedinte', price: '1799', per: '', features: ['20 sedinte x 60 min', 'Plan nutritie inclus', 'Evaluari periodice', 'Suport WhatsApp'], highlight: false }
    ]
  }
};

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-page.component.html'
})
export class ServicePageComponent {
  page: ServicePage;

  constructor(route: ActivatedRoute) {
    this.page = pages[route.snapshot.routeConfig?.path ?? 'sala-fitness'] ?? pages['sala-fitness'];
  }
}
