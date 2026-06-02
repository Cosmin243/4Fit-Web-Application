import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-5 right-5 z-[100] w-[min(22rem,calc(100vw-2rem))] space-y-3 pointer-events-none">
      <div
        *ngFor="let message of toastService.messages$ | async"
        class="pointer-events-auto flex items-start gap-3 rounded border bg-card px-4 py-3 shadow-xl toast-enter"
        [ngClass]="message.type === 'success' ? 'border-green-500/60' : 'border-red-500/60'"
      >
        <i
          class="pi mt-0.5"
          [ngClass]="message.type === 'success' ? 'pi-check-circle text-green-500' : 'pi-exclamation-triangle text-red-500'"
        ></i>
        <p class="text-sm leading-relaxed flex-1">{{ message.text }}</p>
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground"
          aria-label="Inchide notificarea"
          (click)="toastService.remove(message.id)"
        >
          <i class="pi pi-times text-xs"></i>
        </button>
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
