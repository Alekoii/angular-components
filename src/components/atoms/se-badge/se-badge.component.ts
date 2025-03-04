import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'se-badge',
  templateUrl: './se-badge.component.html',
  styleUrls: ['./se-badge.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeBadgeComponent {
  @Input() type: 'small' | 'number' = 'small';
  @Input() color: 'primary' | 'secondary' | 'tertiary' | 'additional' = 'primary';
  @Input() value?: number;
}