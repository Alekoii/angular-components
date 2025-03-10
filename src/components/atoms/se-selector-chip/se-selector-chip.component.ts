import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ChipSize = 'small' | 'nano';

@Component({
  selector: 'se-selector-chip',
  templateUrl: './se-selector-chip.component.html',
  styleUrls: ['./se-selector-chip.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeSelectorChipComponent {
  @Input() label: string = '';
  @Input() size: ChipSize = 'small';
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  
  @Output() select = new EventEmitter<void>();

  get chipClasses(): string[] {
    return [
      'se-selector-chip',
      `se-selector-chip--size-${this.size}`,
      this.selected ? 'se-selector-chip--selected' : '',
      this.disabled ? 'se-selector-chip--disabled' : ''
    ].filter(Boolean);
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.select.emit();
    }
  }
}