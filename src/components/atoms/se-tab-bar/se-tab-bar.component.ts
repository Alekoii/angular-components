import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TabItem {
  id: string;
  title: string;
  content?: string;
  disabled?: boolean;
}

type TabBarVariant = 'primary' | 'secondary';
type TabBarLayout = 'horizontal' | 'vertical';

@Component({
  selector: 'se-tab-bar',
  templateUrl: './se-tab-bar.component.html',
  styleUrls: ['./se-tab-bar.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeTabBarComponent {
  @Input() tabs: TabItem[] = [];
  @Input() variant: TabBarVariant = 'primary';
  @Input() layout: TabBarLayout = 'horizontal';
  @Input() activeTabId?: string;

  @Output() tabChange = new EventEmitter<TabItem>();

  onTabClick(tab: TabItem): void {
    if (!tab.disabled && tab.id !== this.activeTabId) {
      this.activeTabId = tab.id;
      this.tabChange.emit(tab);
    }
  }

  getTabClasses(tab: TabItem): string[] {
    return [
      'se-tab-bar__tab',
      `se-tab-bar__tab--${this.variant}`,
      this.activeTabId === tab.id ? 'se-tab-bar__tab--active' : '',
      tab.disabled ? 'se-tab-bar__tab--disabled' : '',
    ].filter(Boolean);
  }
}