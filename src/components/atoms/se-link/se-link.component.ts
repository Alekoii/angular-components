import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type LinkSize = 'small' | 'medium';
type LinkState = 'enabled' | 'disabled';

@Component({
  selector: 'se-link',
  templateUrl: './se-link.component.html',
  styleUrls: ['./se-link.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeLinkComponent {
  @Input() href: string = '';
  @Input() label: string = '';
  @Input() size: LinkSize = 'medium';
  @Input() showIcon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabel?: string;

  get linkClasses(): string[] {
    return [
      'se-link',
      `se-link--size-${this.size}`,
      this.disabled ? 'se-link--disabled' : '',
      this.showIcon ? 'se-link--with-icon' : ''
    ].filter(Boolean);
  }
}