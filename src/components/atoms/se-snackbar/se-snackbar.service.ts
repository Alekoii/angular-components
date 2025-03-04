import { Injectable, ComponentRef, ApplicationRef, createComponent, Type } from '@angular/core';
import { SeSnackbarComponent } from './se-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SeSnackbarService {
  private snackbarRefs: ComponentRef<SeSnackbarComponent>[] = [];

  constructor(private appRef: ApplicationRef) {}

  show(message: string, options: Partial<SeSnackbarComponent> = {}) {
    // Create and attach component
    const snackbarRef = createComponent(SeSnackbarComponent, {
      environmentInjector: this.appRef.injector
    });

    // Set properties
    Object.assign(snackbarRef.instance, {
      message,
      ...options
    });

    // Add to DOM
    document.body.appendChild(snackbarRef.location.nativeElement);
    this.appRef.attachView(snackbarRef.hostView);

    // Store reference
    this.snackbarRefs.push(snackbarRef);

    // Clean up when closed
    const subscription = snackbarRef.instance['closed'].subscribe(() => {
      const index = this.snackbarRefs.indexOf(snackbarRef);
      if (index > -1) {
        this.snackbarRefs.splice(index, 1);
        this.appRef.detachView(snackbarRef.hostView);
        snackbarRef.destroy();
        subscription.unsubscribe();
      }
    });

    return snackbarRef;
  }

  closeAll() {
    this.snackbarRefs.forEach(ref => {
      ref.instance.close();
    });
  }
}