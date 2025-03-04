// se-menu-dropdown.component.ts
import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'se-menu-dropdown',
  templateUrl: './se-menu-dropdown.component.html',
  styleUrls: ['./se-menu-dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuDropdownComponent {
  @Input() items: MenuItem[] = [];
  @Input() label: string = '';
  @Input() disabled = false;
  @Input() placement: 'bottom-left' | 'bottom-right' = 'bottom-left';

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleMenu() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectItem(item: MenuItem) {
    if (!item.disabled) {
      this.isOpen = false;
    }
  }
}