import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'se-pagination',
  templateUrl: './se-pagination.component.html',
  styleUrls: ['./se-pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SePaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() showEdgeNavigation: boolean = true;
  @Input() showPageSelect: boolean = true;
  @Input() showPageButtons: boolean = false;
  @Input() showGoToPage: boolean = false;
  @Input() align: 'center' | 'left' = 'center';
  
  @Output() pageChange = new EventEmitter<number>();
  
  goToPage: number = 1;
  visiblePages: number[] = [];
  
  ngOnInit() {
    this.updateVisiblePages();
  }
  
  ngOnChanges() {
    this.updateVisiblePages();
    this.goToPage = this.currentPage;
  }
  
  updateVisiblePages() {
    this.visiblePages = [];
    
    if (this.showPageButtons) {
      const start = Math.max(1, this.currentPage - 1);
      const end = Math.min(this.totalPages, start + 2);
      
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    }
  }
  
  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
      this.updateVisiblePages();
    }
  }
  
  goToFirst() {
    this.selectPage(1);
  }
  
  goToPrevious() {
    this.selectPage(this.currentPage - 1);
  }
  
  goToNext() {
    this.selectPage(this.currentPage + 1);
  }
  
  goToLast() {
    this.selectPage(this.totalPages);
  }
  
  handleGoToPageInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.goToPage = parseInt(inputElement.value) || 1;
  }
  
  navigateToPage() {
    this.selectPage(this.goToPage);
  }
}