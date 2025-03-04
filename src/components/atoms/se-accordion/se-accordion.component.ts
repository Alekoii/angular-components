import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeAccordionItemComponent } from './se-accordion-item.component';

type AccordionVariant = 'primary' | 'secondary';

@Component({
  selector: 'se-accordion',
  templateUrl: './se-accordion.component.html',
  styleUrls: ['./se-accordion.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeAccordionComponent {
  @Input() variant: AccordionVariant = 'primary';
  @ContentChildren(SeAccordionItemComponent) items!: QueryList<SeAccordionItemComponent>;
}