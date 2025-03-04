import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 'nano' | 'micro' | 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  selector: 'se-icon',
  templateUrl: './se-icon.component.html',
  styleUrls: ['./se-icon.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeIconComponent {
  @Input() src!: string;
  @Input() size: IconSize = 'small';
  @Input() color?: string;
  @Input() ariaLabel?: string;
  @Input() isDisabled = false;

  get iconClasses(): string[] {
    return [
      'se-icon',
      `se-icon--size-${this.size}`,
      this.isDisabled ? 'se-icon--disabled' : ''
    ].filter(Boolean);
  }
}