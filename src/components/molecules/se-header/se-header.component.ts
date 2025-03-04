import { Component, Input, OnInit, OnDestroy, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeAvatarComponent } from '../../atoms/se-avatar/se-avatar.component';
import { SeIconComponent } from '../../atoms/se-icon/se-icon.component';
import { SearchComponent } from '../../atoms/se-search/se-search.component';
import { SeNotificationComponent } from '../se-notification/se-notification.component';

export interface NavItem {
  label: string;
  route?: string;
  children?: NavItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'se-header',
  templateUrl: './se-header.component.html',
  styleUrls: ['./se-header.component.scss'],
  standalone: true,
  imports: [CommonModule, SeAvatarComponent, SeIconComponent, SearchComponent, SeNotificationComponent]
})
export class SeHeaderComponent implements OnInit, OnDestroy {
  @Input() header = '';
  @Input() navigationItems: NavItem[] = [];
  @Input() logoSrc = 'assets/se-logo.svg';
  @Input() logoAlt = 'Life is On';
  
  // Avatar inputs
  @Input() avatarFirstName?: string;
  @Input() avatarLastName?: string;
  @Input() avatarIcon?: string;

  // Icons
  @Input() icon1?: string;
  @Input() icon2?: string;
  @Input() icon3?: string;
  @Input() icon4?: string;

  // Search
  @Input() searchPlaceholder?: string;

  // Notification
  @Input() isNotificationEnabled = false;
  @Input() notificationBadgeNumber?: number;
  @Output() notificationClick = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.closeAllDropdowns();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeAllDropdowns();
    }
  }

  onIconClick(iconNumber: number): void {
  }

  onSearch(searchTerm: string): void {
  }

  onNavClick(event: Event, item: NavItem): void {
    event.stopPropagation();
    
    if (this.hasChildren(item)) {
      this.navigationItems.forEach(navItem => {
        if (navItem !== item) {
          navItem.isOpen = false;
        }
      });
      item.isOpen = !item.isOpen;
    } else {
      this.closeAllDropdowns();
    }
  }

  onDropdownItemClick(event: Event, item: NavItem): void {
    event.stopPropagation();
    this.closeAllDropdowns();
  }

  onNotificationClick(event: MouseEvent): void {
    event.stopPropagation();   
    this.notificationClick.emit();
  }

  hasChildren(item: NavItem): boolean {
    return !!item.children?.length;
  }

  hasSearch(): boolean {
    return !!this.searchPlaceholder;
  }

  hasAvatar(): boolean {
    return !!(this.avatarFirstName || this.avatarLastName);
  }

  private closeAllDropdowns(): void {
    this.navigationItems?.forEach(item => {
      item.isOpen = false;
    });
  }
}