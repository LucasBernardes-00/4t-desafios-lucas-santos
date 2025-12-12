import { Component, signal } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `
    <app-layout></app-layout>
  `,
})
export class App {
  protected readonly title = signal('front-spa');
}
