import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SideBarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, SideBarComponent],
  template: `
    <div class="flex flex-row h-screen bg-[#F4F4F4]">
      <app-sidebar class="w-64"></app-sidebar>

      <div class="flex-1 bg-white">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class LayoutComponent {

}
