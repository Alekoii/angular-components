import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ChipVariant = 'basic' | 'status';
type ChipSize = 'medium' | 'small';
type ChipStatus = 'success' | 'warning' | 'info' | 'neutral' | 'error';

@Component({
  selector: 'se-chip',
  templateUrl: './se-chip.component.html',
  styleUrls: ['./se-chip.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeChipComponent {
  @Input() label: string = '';
  @Input() variant: ChipVariant = 'basic';
  @Input() size: ChipSize = 'medium';
  @Input() status?: ChipStatus;
  @Input() disabled: boolean = false;
  @Input() removable: boolean = false;
  
  @Output() remove = new EventEmitter<void>();

  get chipClasses(): string[] {
    return [
      'se-chip',
      `se-chip--variant-${this.variant}`,
      `se-chip--size-${this.size}`,
      this.status ? `se-chip--status-${this.status}` : '',
      this.disabled ? 'se-chip--disabled' : '',
      this.removable ? 'se-chip--removable' : ''
    ].filter(Boolean);
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.remove.emit();
    }
  }
}