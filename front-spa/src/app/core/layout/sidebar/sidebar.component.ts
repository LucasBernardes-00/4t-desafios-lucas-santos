import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { InMenuTab, MenuType } from "./sidebar.model";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  template: `
    <button 
      (click)="onToggleMenuClick()"
      class="bg-[#45C4B0] text-white text-2xl ml-4 mt-4 p-2 rounded-xl hover:scale-125 hover:cursor-pointer border-2 border-[#005461]"
    >
      <i class="pi pi-bars"></i>
    </button>

    <div #sidebarMenu class="flex flex-col mb-4 ml-4 mt-3 rounded-xl bg-[#00B7B5] shadow-md">
      <div class="flex justify-center py-3">
        <h1 class="text-3xl">Side Bar</h1>
      </div>
      
      <div>
        @for(opt of menu; track opt.id) {
          @if (opt.isTab) {
            <div class="p-1 flex justify-center">
              <button
                id={{opt.id}}
                #btnOption
                class="w-56 flex flex-row items-center justify-between p-1 rounded-xl hover:bg-[#F4F4F4] hover:cursor-pointer"
                (click)="onToggleTab(opt)"
              >
                {{ opt.name }}
                <i class="pi pi-caret-down"></i>
              </button>
            </div>
            @for(item of opt.options; track item.id) {
              <div class="p-1 flex justify-center hidden">
                <button
                  id={{item.id}}
                  #btnOption
                  [routerLink]="item.router"
                  class="pl-6 w-56 flex flex-row items-center justify-between p-1 rounded-xl hover:bg-[#00B7B5] hover:cursor-pointer"
                >
                  {{ item.name }}
                </button>
              </div>
            }
          }
          @else {
            <div class="p-1 flex justify-center">
              <button
                id={{opt.id}}
                #btnOption
                [routerLink]="opt.router"
                class="w-56 flex flex-row p-1 rounded-xl hover:bg-[#F4F4F4] hover:cursor-pointer"
              >
                {{ opt.name }}
              </button>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class SideBarComponent implements OnInit {
  menu!: MenuType
  
  @ViewChildren('btnOption') sidebarOptions!: QueryList<ElementRef<HTMLButtonElement>>
  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void { 
    this.buildMenuOptions()
  }

  private buildMenuOptions() {
    this.menu = [
      { 
        id: 10, 
        name: 'Beneficiários',
        isTab: false,
        router: '/beneficiario/listar'
      },
      { 
        id: 20, 
        name: 'Planos',
        isTab: false,
        router: '/plano/listar'
      }
    ]
  }

  onToggleTab(tab: InMenuTab) {
    const tabButton = this.sidebarOptions.find(el => el.nativeElement.id === tab.id.toString())?.nativeElement!
    const tabChildren = (this.menu.find(opt => opt.id === tab.id) as InMenuTab).options

    tabChildren.forEach(opt => {
      const optionBtn = this.sidebarOptions.find(el => el.nativeElement.id === opt.id.toString())?.nativeElement!
      const parent = optionBtn.parentElement as HTMLDivElement

      if (tab.isOpen) this.closeTab(parent, tabButton.children[0] as HTMLElement)
      else this.openTab(parent, tabButton.children[0] as HTMLElement)
    })

    tab.isOpen = !tab.isOpen
  }

  onToggleMenuClick() {
    this.sidebarMenu.nativeElement.classList.toggle('hidden')
  }

  private openTab(optParent: HTMLDivElement, iconElement: HTMLElement) {
    optParent.classList.add('hidden')
    iconElement.classList.add('pi-caret-down')
    iconElement.classList.remove('pi-caret-up')
  }

  private closeTab(optParent: HTMLDivElement, iconElement: HTMLElement) {
    optParent.classList.remove('hidden')
    iconElement.classList.add('pi-caret-up')
    iconElement.classList.remove('pi-caret-down')
  }
}