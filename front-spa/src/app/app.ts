import { Component, signal } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';
import { ConfirmActionComponent } from './shared/components/confirm-action.component';
import { ErrorDialogComponent } from './shared/components/error-dialog.component';
import { SuccessDialogComponent } from './shared/components/success-dialog.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ConfirmActionComponent, SuccessDialogComponent, ErrorDialogComponent],
  template: `
    <app-modal-confirmation></app-modal-confirmation>
    <app-success-dialog></app-success-dialog>
    <app-error-dialog></app-error-dialog>
    <app-layout></app-layout>
  `,
})
export class App {
  protected readonly title = signal('front-spa');
}
