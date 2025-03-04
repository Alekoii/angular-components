import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

type RadioState = 'selected' | 'intermediate' | 'active' | null;

interface RadioOption {
  value: any;
  label: string;
  state?: RadioState;
  disabled?: boolean;
}

@Component({
  selector: 'se-radio-button',
  templateUrl: './se-radio-button.component.html',
  styleUrls: ['./se-radio-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeRadioButtonComponent),
      multi: true
    }
  ]
})
export class SeRadioButtonComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() disabled: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() showInfoIcon: boolean = false;

  @Output() stateChange = new EventEmitter<{value: any, state: RadioState}>();

  selectedValue: any = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  selectOption(option: RadioOption) {
    if (!this.isOptionDisabled(option)) {
      this.options.forEach(opt => opt.state = null);
      
      const currentState = option.state || null;
      
      if (this.selectedValue === option.value) {
        if (currentState === 'selected') {
          option.state = 'active';
        } else if (currentState === 'active') {
          option.state = null;
          this.selectedValue = null;
        }
      } else {
        option.state = 'selected';
        this.selectedValue = option.value;
      }

      this.onChange(this.selectedValue);
      this.stateChange.emit({ value: option.value, state: option.state || null });
      this.onTouched();
    }
  }

  getOptionState(option: RadioOption): RadioState {
    return option.state || null;
  }

  isOptionDisabled(option: RadioOption): boolean {
    return this.disabled || !!option.disabled;
  }

  writeValue(value: any): void {
    this.selectedValue = value;
    if (value === null) {
      this.options.forEach(opt => opt.state = null);
    } else {
      this.options.forEach(opt => {
        opt.state = opt.value === value ? 'selected' : null;
      });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}