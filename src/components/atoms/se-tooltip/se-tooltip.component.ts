import { Component, Input, ElementRef, ViewChild, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipType = 'simple' | 'info' | 'complex';

@Component({
  selector: 'se-tooltip',
  templateUrl: './se-tooltip.component.html',
  styleUrls: ['./se-tooltip.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeTooltipComponent {
  @Input() content: string = '';
  @Input() title?: string;
  @Input() left: number = 0; 
  @Input() top: number = 0;
  // @Input() position: TooltipPosition = 'top';
  // @Input() type: TooltipType = 'simple';
  // @Input() isVisible: boolean = false;
  // @Input() targetElement?: ElementRef;

  // @ViewChild('tooltipElement') tooltipElement!: ElementRef;

  // ngOnChanges(changes: SimpleChanges) {
  //   if ((changes['isVisible'] || changes['targetElement']) && this.targetElement && this.tooltipElement) {
  //     this.updateTooltipPosition();
  //   }
  // }

  // private updateTooltipPosition() {
  //   if (!this.targetElement?.nativeElement || !this.tooltipElement?.nativeElement) return;

  //   const target = this.targetElement.nativeElement;
  //   const tooltip = this.tooltipElement.nativeElement;
  //   const targetRect = target.getBoundingClientRect();

  //   const positions = {
  //     top: {
  //       top: targetRect.top - tooltip.offsetHeight - 8,
  //       left: targetRect.left + (targetRect.width - tooltip.offsetWidth) / 2
  //     },
  //     bottom: {
  //       top: targetRect.bottom + 8,
  //       left: targetRect.left + (targetRect.width - tooltip.offsetWidth) / 2
  //     },
  //     left: {
  //       top: targetRect.top + (targetRect.height - tooltip.offsetHeight) / 2,
  //       left: targetRect.left - tooltip.offsetWidth - 8
  //     },
  //     right: {
  //       top: targetRect.top + (targetRect.height - tooltip.offsetHeight) / 2,
  //       left: targetRect.right + 8
  //     }
  //   };

  //   const position = positions[this.position];
  //   tooltip.style.top = `${position.top}px`;
  //   tooltip.style.left = `${position.left}px`;
  // }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.isVisible = true;
  //   this.updateTooltipPosition();
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.isVisible = false;
  // }
}
