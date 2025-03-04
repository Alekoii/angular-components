import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepperStep {
    label: string;
    state: 'completed' | 'current' | 'upcoming';
    disabled?: boolean;
}

@Component({
    selector: 'se-stepper',
    templateUrl: './se-stepper.component.html',
    styleUrls: ['./se-stepper.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class SeStepperComponent {
    @Input() steps: StepperStep[] = [];
    @Input() currentStep: number = 0;
    @Output() stepChange = new EventEmitter<number>();

    selectStep(index: number): void {
        if (!this.steps[index].disabled && index <= this.getMaxSelectableStep()) {
            this.currentStep = index;
            this.stepChange.emit(index);
        }
    }

    getMaxSelectableStep(): number {
        const completedSteps = this.steps.filter(step => step.state === 'completed').length;
        return Math.max(completedSteps, this.currentStep);
    }

    isStepSelectable(index: number): boolean {
        return !this.steps[index].disabled && index <= this.getMaxSelectableStep();
    }
}