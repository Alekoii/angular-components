import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'se-breadcrumb',
  templateUrl: './se-breadcrumb.component.html',
  styleUrls: ['./se-breadcrumb.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SeBreadcrumbComponent implements AfterViewInit {
  @Input() items: BreadcrumbItem[] = [];
  @ViewChild('breadcrumbList') breadcrumbList!: ElementRef;
  
  showOverflowMenu = false;
  isOverflowMenuOpen = false;
  visibleItems: BreadcrumbItem[] = [];
  overflowItems: BreadcrumbItem[] = [];
  
  ngAfterViewInit() {
    this.checkOverflow();
    window.addEventListener('resize', () => this.checkOverflow());
  }

  private checkOverflow() {
    const container = this.breadcrumbList.nativeElement;
    const isOverflowing = container.scrollWidth > container.clientWidth;

    if (isOverflowing && this.items.length > 3) {
      // Keep first and last items visible, put others in overflow menu
      this.visibleItems = [this.items[0], this.items[this.items.length - 1]];
      this.overflowItems = this.items.slice(1, -1);
      this.showOverflowMenu = true;
    } else {
      this.visibleItems = this.items;
      this.overflowItems = [];
      this.showOverflowMenu = false;
      this.isOverflowMenuOpen = false;
    }
  }

  toggleOverflowMenu() {
    this.isOverflowMenuOpen = !this.isOverflowMenuOpen;
  }

  closeOverflowMenu() {
    this.isOverflowMenuOpen = false;
  }
}