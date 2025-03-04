import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeButtonComponent } from '../../atoms/se-button/se-button.component';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'outline' | 'filled';
type ButtonType = 'standard' | 'primary' | 'secondary' | 'danger' | 'warning';

interface HeaderInfo {
  label: string;
  value: string;
  countryCode?: string;
}

interface MetadataItem {
  icon?: string;
  value: string;
  type?: 'time-offer' | 'duration' | 'price';
}

interface ActionButton {
  label: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
  iconPath?: string;
  showLabel?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

@Component({
  selector: 'se-header-subtitle',
  templateUrl: './se-header-subtitle.component.html',
  styleUrls: ['./se-header-subtitle.component.scss'],
  standalone: true,
  imports: [CommonModule, SeButtonComponent]
})
export class HeaderSubtitleComponent {
  @Input() primaryInfo?: HeaderInfo;
  @Input() secondaryInfo?: HeaderInfo;
  @Input() metadata: MetadataItem[] = [];
  @Input() actions: ActionButton[] = [];

  handleActionClick(action: ActionButton): void {
    if (!action.isDisabled) {
      action.onClick();
    }
  }
}