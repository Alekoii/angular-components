import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeBadgeComponent } from '../../atoms/se-badge/se-badge.component';

@Component({
  selector: 'se-notification',
  templateUrl: './se-notification.component.html',
  styleUrls: ['./se-notification.component.scss'],
  standalone: true,
  imports: [CommonModule, SeBadgeComponent]
})
export class SeNotificationComponent {
  @Input() isNotification = false;
  @Input() icon?: string;
  @Input() ariaLabel = 'Notification';
  @Input() badgeColor: 'primary' | 'secondary' | 'tertiary' | 'additional' = 'primary';
  @Input() badgeNumber?: number;
}