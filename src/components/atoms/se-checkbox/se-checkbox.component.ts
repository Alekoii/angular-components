import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'se-checkbox',
  templateUrl: './se-checkbox.component.html',
  styleUrls: ['./se-checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SeCheckboxComponent,
      multi: true
    }
  ]
})
export class SeCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() showInfoIcon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() state: 'selected' | 'intermediate' | 'active' | null = null;

  @Output() stateChange = new EventEmitter<'selected' | 'intermediate' | 'active' | null>();

  isFocused: boolean = false;
  isHovered: boolean = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggleState() {
    if (!this.disabled) {
      let newState: 'selected' | 'intermediate' | 'active' | null = null;
      
      switch(this.state) {
        case null:
          newState = 'selected';
          break;
        case 'selected':
          newState = 'active';
          break;
        case 'active':
          newState = null;
          break;
        case 'intermediate':
          newState = 'selected';
          break;
      }
      
      this.state = newState;
      this.stateChange.emit(this.state);
      this.onChange(!!this.state);
    }
  }

  onFocus() {
    this.isFocused = true;
    this.onTouched();
  }

  onBlur() {
    this.isFocused = false;
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  get stateClasses(): string[] {
    return [
      'se-checkbox',
      this.disabled ? 'se-checkbox--disabled' : '',
      this.isFocused ? 'se-checkbox--focused' : '',
      this.isHovered ? 'se-checkbox--hovered' : '',
      this.state ? `se-checkbox--${this.state}` : ''
    ].filter(Boolean);
  }

  writeValue(value: boolean): void {
    if (!value) {
      this.state = null;
    } else if (!this.state) {
      this.state = 'selected';
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}