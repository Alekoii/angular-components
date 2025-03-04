import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

export type SnackbarType = 'success' | 'warning' | 'info' | 'error';
export type SnackbarPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

@Component({
  selector: 'se-snackbar',
  templateUrl: './se-snackbar.component.html',
  styleUrls: ['./se-snackbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SeSnackbarComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: SnackbarType = 'info';
  @Input() position: SnackbarPosition = 'bottom-center';
  @Input() duration: number = 5000;
  @Input() showCloseButton: boolean = true;
  @Output() closed = new EventEmitter<void>();

  visible: boolean = true;
  private timeoutId?: number;

  ngOnInit() {
    if (this.duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }
}