import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GymInformationComponent } from './pages/navbar/gym-information/gym-information.component';
import { NavbarComponent } from './pages/navbar/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ToastContainerComponent } from './shared/toast/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GymInformationComponent, NavbarComponent, FooterComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '4FitFrontend';
}
