import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeButtonComponent } from '../../atoms/se-button/se-button.component';
import { SeChipComponent } from '../../atoms/se-chip/se-chip.component';
import { SeCheckboxComponent } from '../../atoms/se-checkbox/se-checkbox.component';

type ButtonVariant = 'outline' | 'filled';
type ButtonType = 'standard' | 'primary' | 'secondary' | 'danger' | 'warning';
type ButtonSize = 'small' | 'medium' | 'large';

interface ActionButton {
  label: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
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
  @Input() heading: string = '';
  @Input() price: number = 0;
  @Input() priceInfoIcon = false;
  @Input() image?: string;
  @Input() subHeading?: string;
  @Input() primaryChipText?: string;
  @Input() secondaryChipText?: string;
  @Input() quantity: number = 1;
  @Input() showCountersInQuantity = true;
  @Input() showInfoIconForQuantity = false;
  @Input() showIncludedWithUPS = false;
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showSustainabilityImage = false;
  @Input() actionButtonCount: 0 | 1 | 2 | 3 | 4 = 0;
  @Input() actionButtons: ActionButton[] = [];
  @Input() isInStock = true;
  @Input() isSelected = false;
  @Input() detailsContent: string = 'This is the expanded details section with additional information about the product. It can include specifications, features, and other important details that the user might want to know.';

  @Output() onPrimaryAction = new EventEmitter<void>();
  @Output() onSecondaryAction = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<boolean>();
  @Output() onQuantityChange = new EventEmitter<number>();
  @Output() onButton1Action = new EventEmitter<void>();
  @Output() onButton2Action = new EventEmitter<void>();
  @Output() onButton3Action = new EventEmitter<void>();
  @Output() onButton4Action = new EventEmitter<void>();

  imgError = false;
  isDetailsExpanded = false;

  // Handle screen size change
  isMobile = false;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  handleImageError() {
    this.imgError = true;
  }

  onCheckboxChange(state: 'selected' | 'intermediate' | 'active' | null) {
    this.isSelected = state === 'selected';
    this.onSelect.emit(this.isSelected);
  }

  increaseQuantity() {
    this.quantity++;
    this.onQuantityChange.emit(this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.onQuantityChange.emit(this.quantity);
    }
  }

  handleEdit(): void {
    this.onEdit.emit();
  }

  handleDelete(): void {
    this.onDelete.emit();
  }

  toggleDetails(): void {
    this.isDetailsExpanded = !this.isDetailsExpanded;
  }

  onActionButton(buttonIndex: number) {
    switch (buttonIndex) {
      case 1:
        this.onButton1Action.emit();
        this.onPrimaryAction.emit();
        break;
      case 2:
        this.onButton2Action.emit();
        this.onSecondaryAction.emit();
        break;
      case 3:
        this.onButton3Action.emit();
        break;
      case 4:
        this.onButton4Action.emit();
        break;
    }
  }
}