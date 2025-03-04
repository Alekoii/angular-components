import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type LoaderSize = 'nano' | 'small' | 'medium' | 'large';
type LoaderVariant = 'spinner' | 'dots';

@Component({
  selector: 'se-loading',
  templateUrl: './se-loading.component.html',
  styleUrls: ['./se-loading.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeLoadingComponent {
  @Input() size: LoaderSize = 'medium';
  @Input() variant: LoaderVariant = 'spinner';
  @Input() showMessage = false;
  @Input() message = 'Loading...';

  get loadingClasses(): string[] {
    return [
      'se-loading',
      `se-loading--size-${this.size}`,
      this.showMessage ? 'se-loading--with-message' : ''
    ].filter(Boolean);
  }
}