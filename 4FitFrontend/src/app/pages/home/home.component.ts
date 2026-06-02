import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  stats = [
    { val: '500+', label: 'Membri activi' },
    { val: '10+', label: 'Antrenori' },
    { val: '2000m²', label: 'Suprafață' }
  ];

  services = [
    { title: 'Sala de fitness', desc: 'Echipamente moderne, greutăți libere și zonă cardio completă.', image: '/assets/service-fitness.jpg', link: '/sala-fitness', icon: 'pi pi-bolt' },
    { title: 'Bazin de înot', desc: 'Bazin semi-olimpic încălzit, cursuri și înot liber.', image: '/assets/service-pool.jpg', link: '/bazin-inot', icon: 'pi pi-wave-pulse' },
    { title: 'Antrenor personal', desc: 'Planuri individuale de antrenament și monitorizare progres.', image: '/assets/service-trainer.jpg', link: '/antrenor-personal', icon: 'pi pi-user-plus' }
  ];

  classes = [
    { title: 'Aerobic', desc: 'Antrenamente energizante pentru rezistență și tonifiere.', link: '/aerobic' },
    { title: 'Pilates', desc: 'Core puternic, postură mai bună și mobilitate.', link: '/pilates' },
    { title: 'Karate', desc: 'Disciplină, tehnică și încredere pentru toate vârstele.', link: '/karate' },
    { title: 'Yoga', desc: 'Respirație, flexibilitate și echilibru mental.', link: '/yoga' }
  ];
}
