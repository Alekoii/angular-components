import { Directive, ElementRef, Input, HostListener, ComponentRef, ApplicationRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { SeTooltipComponent } from '../components/atoms/se-tooltip/se-tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class SeTooltipDirective {
  @Input() appTooltip: string = '';
  
  private componentRef!: ComponentRef<SeTooltipComponent>;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SeTooltipComponent);
    this.componentRef = factory.create(this.injector);
    
    this.componentRef.instance.content = this.appTooltip;

    const { top, left } = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentRef.instance.left = left + window.scrollX;
    this.componentRef.instance.top = top + window.scrollY - this.componentRef.instance.content.length;

    this.appRef.attachView(this.componentRef.hostView);
    document.body.appendChild(this.componentRef.location.nativeElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null!;
    }
  }
}
