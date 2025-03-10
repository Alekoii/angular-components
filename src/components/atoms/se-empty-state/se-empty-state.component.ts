import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeButtonComponent } from '../se-button/se-button.component';

@Component({
  selector: 'se-empty-state',
  templateUrl: './se-empty-state.component.html',
  styleUrls: ['./se-empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule, SeButtonComponent]
})
export class SeEmptyStateComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() bodyText: string = '';
  @Input() iconSrc?: string;
  @Input() actionButtonText?: string;
  @Input() actionButtonType: 'standard' | 'primary' | 'secondary' = 'primary';
  @Input() actionButtonVariant: 'outline' | 'filled' = 'filled';
  @Input() linkText?: string;
  @Input() linkUrl?: string;
  @Input() centered: boolean = true;

  @Output() actionClicked = new EventEmitter<void>();
  @Output() linkClicked = new EventEmitter<void>();

  get hasAction(): boolean {
    return !!this.actionButtonText;
  }

  get hasLink(): boolean {
    return !!this.linkText;
  }

  onActionClick(): void {
    this.actionClicked.emit();
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }
}