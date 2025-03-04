import { Component, Input, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeButtonComponent } from '../../atoms/se-button/se-button.component';
import { SeChipComponent } from '../../atoms/se-chip/se-chip.component';
import { SeCheckboxComponent } from '../../atoms/se-checkbox/se-checkbox.component';

interface MenuItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'se-card',
  templateUrl: './se-card.component.html',
  styleUrls: ['./se-card.component.scss'],
  standalone: true,
  imports: [CommonModule, SeButtonComponent, SeChipComponent, SeCheckboxComponent]
})
export class SeCardComponent {
  @Input() checkBox = true;
  @Input() heading !: string;
  @Input() price !: number;
  @Input() priceInfoIcon = false;
  @Input() image !: string | undefined;
  @Input() subHeading !: string | undefined;
  @Input() primaryChipText !: string | undefined;
  @Input() secondaryChipText !: string | undefined;
  @Input() quantity !: number | undefined;
  @Input() showCountersInQuantity = true;
  @Input() showInfoIconForQuantity = false;
  @Input() showIncludedWithUPS = false;
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showSustainabilityImage = false;
  @Input() actionButtonCount: 0 | 1 | 2 | 3 | 4 = 0;

  @Output() onPrimaryAction = new EventEmitter();
  @Output() onSecondaryAction = new EventEmitter();
  @Output() onButton1Action = new EventEmitter();
  @Output() onButton2Action = new EventEmitter();
  @Output() onButton3Action = new EventEmitter();
  @Output() onButton4Action = new EventEmitter();


}