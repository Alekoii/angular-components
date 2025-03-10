import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeButtonComponent } from '../components/atoms/se-button/se-button.component';
import { HeaderSubtitleComponent } from '../components/molecules/se-header-subtitle/se-header-subtitle.component';
import { SeLoadingComponent } from '../components/atoms/se-loading/se-loading.component';
import { DropdownSelectorComponent } from '../components/atoms/se-dropdown-selector/se-dropdown-selector.component';
import { SeCheckboxComponent } from '../components/atoms/se-checkbox/se-checkbox.component';
import { SeHeaderComponent } from '../components/molecules/se-header/se-header.component';
import { SeAvatarComponent } from '../components/atoms/se-avatar/se-avatar.component';
import { SeCardComponent } from "../components/organisms/se-card/se-card.component";
import { SeTooltipComponent } from "../components/atoms/se-tooltip/se-tooltip.component";
import { SeTooltipDirective } from '../directives/tooltip.directive';
import { SeStepperComponent, StepperStep } from '../components/atoms/se-stepper/se-stepper.component';
import { SeChipComponent } from '../components/atoms/se-chip/se-chip.component';
import { SePaginationComponent } from '../components/atoms/se-pagination/se-pagination.component';
import { SeSelectorChipComponent } from "../components/atoms/se-selector-chip/se-selector-chip.component";

// These types should match those defined in the SeCardComponent
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
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SeButtonComponent,
    SeLoadingComponent,
    DropdownSelectorComponent,
    SeHeaderComponent,
    SeCheckboxComponent,
    SeAvatarComponent,
    HeaderSubtitleComponent,
    SeCardComponent,
    SeTooltipComponent,
    SeTooltipDirective,
    HeaderSubtitleComponent,
    SeStepperComponent,
    SeChipComponent,
    SePaginationComponent,
    SeSelectorChipComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'packagedemo';
  isSelected = true;
    isDisabled = true;
    wasClicked = false;
    
    toggleSelected(): void {
      this.isSelected = !this.isSelected;
    }
    
    toggleDisabled(): void {
      this.isDisabled = !this.isDisabled;
    }
    
    onChipSelect(): void {
      this.wasClicked = true;
      // Reset the notification after 2 seconds
      setTimeout(() => {
        this.wasClicked = false;
      }, 2000);
    }

  steps: StepperStep[] = [
    { label: 'Step 1', state: 'completed' },
    { label: 'Step 2', state: 'current' },
    { label: 'Step 3', state: 'upcoming' },
    { label: 'Step 4', state: 'upcoming' },
    { label: 'Step 5', state: 'upcoming' },
    { label: 'Step 6', state: 'upcoming' }
  ];

  currentStepIndex = 1;

  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' }
  ];

  navigationItems = [
    {
      label: 'Home',
      route: '/home',
      children: [
        { label: 'Dashboard', route: '/home/dashboard' },
        { label: 'Analytics', route: '/home/analytics' },
        { label: 'Reports', route: '/home/reports' }
      ]
    },
    {
      label: 'Products',
      route: '/products',
      children: [
        { label: 'Overview', route: '/products/overview' },
        { label: 'Catalog', route: '/products/catalog' },
        { label: 'Inventory', route: '/products/inventory' }
      ]
    },
    {
      label: 'About',
      route: '/about'
    }
  ];

  headerIcons = [
    {
      src: 'path/to/icon1.svg',
      alt: 'Settings',
      ariaLabel: 'Open Settings',
      onClick: () => console.log('Settings clicked')
    },
    {
      src: 'path/to/icon2.svg',
      alt: 'Profile',
      ariaLabel: 'View Profile',
      onClick: () => console.log('Profile clicked')
    }
  ];
  // Dummy data for the card component with properly typed actionButtons
  cardData = {
    heading: 'Smart Energy Controller',
    subHeading: 'Advanced energy monitoring and management device',
    price: 199.99,
    image: 'assets/placeholder.svg',
    primaryChipText: 'New',
    secondaryChipText: 'Energy Efficient',
    quantity: 1,
    priceInfoIcon: true,
    showCountersInQuantity: true,
    showInfoIconForQuantity: true,
    showIncludedWithUPS: true,
    showEdit: true,
    showDelete: true,
    showSustainabilityImage: true,
    actionButtonCount: 3 as const,
    actionButtons: [
      { label: 'Add to Cart', type: 'primary' as ButtonType, variant: 'filled' as ButtonVariant, size: 'small' as ButtonSize },
      { label: 'Save for Later', type: 'standard' as ButtonType, variant: 'outline' as ButtonVariant, size: 'small' as ButtonSize }
    ] as ActionButton[],
    isInStock: true,
    isSelected: false
  };

  onStepChange(stepIndex: number): void {
    this.currentStepIndex = stepIndex;
    this.steps = this.steps.map((step, index) => ({
      ...step,
      state: index < stepIndex ? 'completed' :
        index === stepIndex ? 'current' : 'upcoming'
    }));
  }

  // Event handlers for the card component
  handlePrimaryAction(): void {
    console.log('Primary action clicked');
  }

  handleSecondaryAction(): void {
    console.log('Secondary action clicked');
  }

  handleEdit(): void {
    console.log('Edit clicked');
  }

  handleDelete(): void {
    console.log('Delete clicked');
  }

  handleSelect(selected: boolean): void {
    console.log('Selected:', selected);
    this.cardData.isSelected = selected;
  }

  handleQuantityChange(quantity: number): void {
    console.log('Quantity changed:', quantity);
    this.cardData.quantity = quantity;
  }
}