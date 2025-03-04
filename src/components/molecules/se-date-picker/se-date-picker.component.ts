import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

interface DateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'se-date-picker',
  templateUrl: './se-date-picker.component.html',
  styleUrls: ['./se-date-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit {
  @Input() showTimePicker = false;
  @Input() isRange = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() placeholder = 'Select date';
  @Output() dateChange = new EventEmitter<Date | DateRange>();

  isOpen = false;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  selectedDates: Date[] = [];
  calendarDays: CalendarDay[] = [];
  
  selectedHour = 12;
  selectedMinute = 0;
  meridian = 'AM';

  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  readonly years = Array.from(
    { length: 21 }, 
    (_, i) => new Date().getFullYear() - 10 + i
  );

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.updateCalendar();
  }

  toggleCalendar(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.updateCalendar();
    }
    this.cdr.detectChanges();
  }

  updateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    this.calendarDays = [];

    // Previous month days
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
      this.calendarDays.push(this.createCalendarDay(date, false));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.calendarDays.push(this.createCalendarDay(date, true));
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, i);
      this.calendarDays.push(this.createCalendarDay(date, false));
    }

    this.cdr.detectChanges();
  }

  createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const today = new Date();
    const isSelected = this.selectedDates.some(
      selectedDate => this.isSameDay(selectedDate, date)
    );
    
    return {
      date,
      isCurrentMonth,
      isSelected,
      isToday: this.isSameDay(date, today),
      isInRange: this.isDateInRange(date),
      isDisabled: this.isDateDisabled(date)
    };
  }

  selectDate(day: CalendarDay) {
    if (day.isDisabled) return;

    if (this.isRange) {
      if (this.selectedDates.length === 0 || this.selectedDates.length === 2) {
        this.selectedDates = [day.date];
      } else {
        const startDate = this.selectedDates[0];
        if (day.date < startDate) {
          this.selectedDates = [day.date, startDate];
        } else {
          this.selectedDates = [startDate, day.date];
        }
        if (!this.showTimePicker) {
          this.applySelection();
        }
      }
    } else {
      this.selectedDates = [day.date];
      if (!this.showTimePicker) {
        this.applySelection();
      }
    }
    
    this.updateCalendar();
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  toggleMeridian() {
    this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';
    this.cdr.detectChanges();
  }

  applySelection() {
    if (this.selectedDates.length === 0) return;

    const applyTimeToDate = (date: Date) => {
      const newDate = new Date(date);
      let hours = this.selectedHour;
      if (this.meridian === 'PM' && hours !== 12) hours += 12;
      if (this.meridian === 'AM' && hours === 12) hours = 0;
      newDate.setHours(hours, this.selectedMinute);
      return newDate;
    };

    if (this.isRange && this.selectedDates.length === 2) {
      this.dateChange.emit({
        start: applyTimeToDate(this.selectedDates[0]),
        end: applyTimeToDate(this.selectedDates[1])
      });
    } else {
      this.dateChange.emit(applyTimeToDate(this.selectedDates[0]));
    }

    this.isOpen = false;
    this.cdr.detectChanges();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  private isDateInRange(date: Date): boolean {
    if (!this.isRange || this.selectedDates.length !== 2) return false;
    return date > this.selectedDates[0] && date < this.selectedDates[1];
  }

  private isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  get displayValue(): string {
    if (!this.selectedDates.length) return '';
    
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      let result = `${day}/${month}/${year}`;
      
      if (this.showTimePicker) {
        result += ` ${this.selectedHour}:${this.selectedMinute.toString().padStart(2, '0')} ${this.meridian}`;
      }
      
      return result;
    };

    if (this.isRange && this.selectedDates.length === 2) {
      return `${formatDate(this.selectedDates[0])} - ${formatDate(this.selectedDates[1])}`;
    }
    
    return formatDate(this.selectedDates[0]);
  }
}