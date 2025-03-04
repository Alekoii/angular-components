import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'se-avatar',
  templateUrl: './se-avatar.component.html',
  styleUrls: ['./se-avatar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeAvatarComponent {
  @Input() firstName?: string = '';
  @Input() lastName?: string = '';
  @Input() size: 'nano' | 'micro' | 'medium' | 'large' = 'medium';

  get initials(): string {
    const firstInitial = this.firstName ? this.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.lastName ? this.lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
}


  get sizeClass(): string {
    return `se-avatar--${this.size}`;
  }
}