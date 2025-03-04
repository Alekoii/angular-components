import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';


@Component({
  selector: 'se-input-field',
  templateUrl: './se-input-field.component.html',
  styleUrls: ['./se-input-field.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] as Type<any>[] 
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() type: 'inline' | 'stacked' = 'inline';
  @Input() size: 'single-line' | 'multi-line' = 'single-line';
  @Input() state: 'enabled' | 'active' | 'selected' | 'error' = 'enabled';
  @Input() icon: boolean = false;
  @Input() iconPath?: string;
  @Input() inputType: 'text' | 'alphanumeric' | 'numeric' = 'alphanumeric';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() infoIcon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() errorText: string = '';
  @Input() value: string = '';


  @Output() valueChange = new EventEmitter<string>();

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
    this.valueChange.emit(inputValue);
  }

  getInputType(): string {
    switch (this.inputType) {
      case 'numeric':
        return 'number';
      case 'alphanumeric':
      case 'text':
      default:
        return 'text';
    }
  }
}