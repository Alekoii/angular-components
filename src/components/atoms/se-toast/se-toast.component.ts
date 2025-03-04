import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastConfig {
  icon: string;
  fill: string;
}

@Component({
  selector: 'se-toast',
  templateUrl: './se-toast.component.html',
  styleUrls: ['./se-toast.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeToastComponent {
  @Input() type: ToastType = 'info';
  @Input() content: string = '';
  @Output() close = new EventEmitter<void>();

  readonly toastConfigs: Record<ToastType, ToastConfig> = {
    success: {
      icon: 'M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z',
      fill: '#3DCD58'
    },
    error: {
      icon: 'M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z',
      fill: '#DC0A0A'
    },
    warning: {
      icon: 'M17.6719 14.4141C17.8828 14.7422 17.9766 15.1406 18 15.5391C18 15.9844 17.8125 16.4062 17.4609 16.7109C17.0625 16.9922 16.5703 17.1328 16.0781 17.1328H1.92188C1.42969 17.1328 0.9375 16.9922 0.539062 16.7109C0.210938 16.4062 0 15.9844 0 15.5391C0.0234375 15.1406 0.117188 14.7422 0.328125 14.4141L7.42969 1.92188C7.73438 1.3125 8.32031 0.914062 9 0.867188C9.67969 0.914062 10.2656 1.3125 10.5703 1.92188L17.6719 14.4141ZM8.41406 5.71875C8.25 5.85938 8.15625 6.07031 8.17969 6.30469L8.41406 10.8984C8.39062 11.0625 8.46094 11.2266 8.57812 11.3438C8.69531 11.4375 8.85938 11.5078 9 11.4844C9.14062 11.4844 9.30469 11.4375 9.42188 11.3438C9.53906 11.2266 9.60938 11.0625 9.58594 10.8984L9.82031 6.30469C9.84375 6.07031 9.75 5.85938 9.58594 5.71875C9.25781 5.39062 8.74219 5.39062 8.41406 5.71875ZM9.65625 14.3672C9.84375 14.2031 9.96094 13.9453 9.9375 13.6875C9.9375 13.4297 9.84375 13.1953 9.65625 13.0547C9.30469 12.6797 8.71875 12.6797 8.34375 13.0547C7.99219 13.4062 7.99219 14.0156 8.34375 14.3672C8.53125 14.5312 8.76562 14.625 9 14.625C9.25781 14.625 9.46875 14.5312 9.65625 14.3672Z',
      fill: '#E47F00'
    },
    info: {
      icon: 'M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z',
      fill: '#42B4E6'
    }
  };

  get toastClasses(): string[] {
    return [
      'se-toast',
      `se-toast--type-${this.type}`
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.close.emit();
    }, 3500);
  }

  handleClose() {
    this.close.emit();
  }
}