import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { SuccessDialogService } from "../services/success-dialog.service";

@Component({
  selector: 'app-success-dialog',
  imports: [CommonModule],
  template: `
    <div 
      #confirmationModal 
      class="z-40 h-full w-full top-0 start-0 absolute bg-gray-300/50 p-3 hidden"
      [ngClass]="{
        'hidden': !service.IsVisible
      }"        
    >
      <div class="z-50 absolute top-[30%] start-[40%] w-80 bg-white rounded-xl">
        <div class="flex justify-end pr-2 pt-2">
          <button 
            (click)="onCloseClick()" 
            class="hover:scale-125 hover:cursor-pointer"
          >
            <i class="pi pi-times text-gray-500" style="font-size: 1rem"></i>
          </button>
        </div>

        <div class="flex justify-center">
          <h1 class="text-2xl text-[#1bc95b] font-semibold">Sucesso</h1>
        </div>

        <div class="flex justify-center my-3">
          <h1 class="text-base text-gray-500">{{ service.Message }}</h1>
        </div>

        <div class="flex flex-row justify-center pb-4">
          <button (click)="onCloseClick()" class="bg-[#1bc95b] py-1 w-16 rounded-lg text-white font-semibold hover:scale-115 hover:cursor-pointer">
            Ok
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDialogComponent {
  service = inject(SuccessDialogService)

  onCloseClick() {
    this.service.hidde()
  }
}
