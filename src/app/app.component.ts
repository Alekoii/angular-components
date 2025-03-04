import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeButtonComponent, SeHeaderSubtitleComponent } from 'se-design-components';
import { SeLoadingComponent } from 'se-design-components';
import { DropdownSelectorComponent } from '../components/atoms/se-dropdown-selector/se-dropdown-selector.component';
import { SeCheckboxComponent } from '../components/atoms/se-checkbox/se-checkbox.component';
import { SeHeaderComponent } from '../components/molecules/se-header/se-header.component';
import { SeAvatarComponent } from '../components/atoms/se-avatar/se-avatar.component';
import { HeaderSubtitleComponent } from "../components/molecules/se-header-subtitle/se-header-subtitle.component";
import { SeCardComponent } from "../components/organisms/se-card/se-card.component";
import { SeTooltipComponent } from "../components/atoms/se-tooltip/se-tooltip.component";
import { SeTooltipDirective } from '../directives/tooltip.directive';
import { SeStepperComponent, StepperStep } from '../components/atoms/se-stepper/se-stepper.component';

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
    SeHeaderSubtitleComponent, 
    SeStepperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'packagedemo';
  
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
<<<<<<< Updated upstream
    { value: '4', label: 'Option 3' },
    { value: '5', label: 'Option 3' },
    { value: '6', label: 'Option 3' },
    { value: '7', label: 'Option 3' },
=======
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' }, 
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    }];
}
=======
    }
  ];
>>>>>>> Stashed changes

  onStepChange(stepIndex: number): void {
    this.currentStepIndex = stepIndex;
    this.steps = this.steps.map((step, index) => ({
      ...step,
      state: index < stepIndex ? 'completed' : 
             index === stepIndex ? 'current' : 'upcoming'
    }));
  }
}