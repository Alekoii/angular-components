import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './se-button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when not disabled', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(component.clicked, 'emit');
    
    component.isDisabled = false;
    component.handleClick(mockEvent);
    
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(component.clicked, 'emit');
    
    component.isDisabled = true;
    component.handleClick(mockEvent);
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should apply correct classes based on inputs', () => {
    component.size = 'small';
    component.variant = 'outline';
    component.type = 'primary';
    
    const classes = component.buttonClasses;
    
    expect(classes).toContain('se-button--size--small');
    expect(classes).toContain('se-button--variant--outline');
    expect(classes).toContain('se-button--type--primary');
  });
});