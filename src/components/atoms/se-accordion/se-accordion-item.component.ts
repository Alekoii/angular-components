import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'se-accordion-item',
  templateUrl: './se-accordion-item.component.html',
  styleUrls: ['./se-accordion.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeAccordionItemComponent {
  @Input() title!: string;
  @Input() disabled: boolean = false;
  @Input() expanded: boolean = false;

  @HostBinding('class') get className() {
    return [
      'se-accordion__item',
      this.disabled ? 'se-accordion__item--disabled' : '',
      this.expanded ? 'se-accordion__item--expanded' : ''
    ].filter(Boolean).join(' ');
  }

  toggle(): void {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }
}