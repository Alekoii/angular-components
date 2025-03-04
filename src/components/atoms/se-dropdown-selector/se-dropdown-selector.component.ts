import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'se-dropdown-selector',
  templateUrl: './se-dropdown-selector.component.html',
  styleUrls: ['./se-dropdown-selector.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownSelectorComponent,
      multi: true
    }
  ]
})
export class DropdownSelectorComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: DropdownOption[] = [];
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() infoIcon: boolean = false;
  @Input() errorText: string = '';
  @Input() defaultValue?: string | string[];

  @Output() selectionChange = new EventEmitter<string | string[]>();

  isOpen: boolean = false;
  selectedOptions: string[] = [];
  displayValue: string = '';
  showPlaceholder: boolean = true;
  isScrollable: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.isScrollable = this.options.length > 5;
    
    if (this.defaultValue) {
      this.writeValue(this.defaultValue);
    }
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: DropdownOption) {
    if (this.multiple) {
      const index = this.selectedOptions.indexOf(option.value);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      } else {
        this.selectedOptions.push(option.value);
      }
    } else {
      this.selectedOptions = [option.value];
      this.isOpen = false;
    }
    this.updateDisplayValue();
    this.onChange(this.multiple ? this.selectedOptions : this.selectedOptions[0]);
    this.selectionChange.emit(this.multiple ? this.selectedOptions : this.selectedOptions[0]);
  }

  updateDisplayValue() {
    if (this.selectedOptions.length === 0) {
      this.displayValue = '';
      this.showPlaceholder = true;
    } else if (this.multiple) {
      const selectedLabels = this.selectedOptions
        .map(value => this.options.find(opt => opt.value === value)?.label)
        .filter(label => label) 
        .join(', ');
      this.displayValue = selectedLabels || `${this.selectedOptions.length} selected`;
      this.showPlaceholder = false;
    } else {
      const selectedOption = this.options.find(opt => opt.value === this.selectedOptions[0]);
      this.displayValue = selectedOption ? selectedOption.label : '';
      this.showPlaceholder = false;
    }
  }

  writeValue(value: string | string[]): void {
    if (Array.isArray(value)) {
      this.selectedOptions = value;
    } else if (value) {
      this.selectedOptions = [value];
    } else {
      this.selectedOptions = [];
    }
    this.updateDisplayValue();
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

  isSelected(option: DropdownOption): boolean {
    return this.selectedOptions.includes(option.value);
  }

  handleClickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.se-dropdown-selector__container')) {
      this.isOpen = false;
    }
  }
}