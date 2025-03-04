import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'se-search',
  templateUrl: './se-search.component.html',
  styleUrls: ['./se-search.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true
    }
  ]
})
export class SearchComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = true;
  @Input() debounceTime: number = 300;
  @Input() minLength: number = 0;

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  value: string = '';
  private debounceTimeout: any;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();

    // Clear existing timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set new timeout
    if (inputValue.length >= this.minLength) {
      this.debounceTimeout = setTimeout(() => {
        this.search.emit(inputValue);
      }, this.debounceTime);
    }
  }

  clearSearch(): void {
    this.value = '';
    this.onChange('');
    this.onTouched();
    this.search.emit('');
    this.clear.emit();
  }

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
}