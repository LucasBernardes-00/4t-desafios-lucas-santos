import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SideBarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, SideBarComponent,],
  template: `
    <div class="flex flex-row h-screen bg-[#45C4B0]">
      <app-sidebar class="h-full"></app-sidebar>

      <div class="flex-1 bg-[#45C4B0]">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class LayoutComponent {

}
