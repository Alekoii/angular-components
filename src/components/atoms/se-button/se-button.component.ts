import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'outline' | 'filled';
type ButtonType = 'standard' | 'primary' | 'secondary' | 'danger' | 'warning';
type IconPosition = 'left' | 'right';

@Component({
  selector: 'se-button',
  templateUrl: './se-button.component.html',
  styleUrls: ['./se-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeButtonComponent {
  @Input() label!: string;
  @Input() size: ButtonSize = 'medium';
  @Input() variant: ButtonVariant = 'filled';
  @Input() type: ButtonType = 'standard';
  @Input() showLabel = true;
  @Input() isDisabled = false;
  @Input() iconPath?: string;
  @Input() iconPosition: IconPosition = 'right';
  @Input() ariaLabel?: string;
  
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string[] {
    return [
      'se-button',
      `se-button--size--${this.size}`,
      `se-button--variant--${this.variant}`,
      `se-button--type--${this.type}`,
      `se-button--icon-${this.iconPosition}`,
      `se-button--state--${this.isDisabled ? 'disabled' : 'enabled'}`
    ];
  }

  handleClick(event: MouseEvent): void {
    event.stopPropagation();
     if (!this.isDisabled) {
      console.log("clicked");
      this.clicked.emit();
    }
    
  }
}