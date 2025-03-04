import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

type LabelPosition = 'left' | 'right';

@Component({
  selector: 'se-switch',
  templateUrl: './se-switch.component.html',
  styleUrls: ['./se-switch.component.scss'],
  standalone: true, 
  imports: [CommonModule], 
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeSwitchComponent),
      multi: true
    }
  ]
})
export class SeSwitchComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() size: 'small' | 'regular' = 'regular';
  @Input() infoIcon = false;
  @Input() labelPosition: LabelPosition = 'left';
  
  @Output() change = new EventEmitter<boolean>();
  
  value = false;
  
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggleSwitch(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.onChange(this.value);
      this.onTouched();
      this.change.emit(this.value);
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
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