import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ErrorDialogService } from "../services/error-dialog.service";

@Component({
  selector: 'app-error-dialog',
  imports: [CommonModule],
  template: `
    <div 
      #confirmationModal 
      class="z-40 h-full w-full top-0 start-0 absolute bg-gray-300/50 p-3 hidden"
      [ngClass]="{
        'hidden': !service.IsVisible
      }"        
    >
      <div class="z-50 absolute top-[30%] start-[40%] w-auto bg-white rounded-xl">
        <div class="flex justify-end pr-2 pt-2">
          <button 
            (click)="onCloseClick()" 
            class="hover:scale-125 hover:cursor-pointer"
          >
            <i class="pi pi-times text-gray-500" style="font-size: 1rem"></i>
          </button>
        </div>

        <div class="flex justify-center">
          <h1 class="text-2xl text-[#ff675b] font-semibold">
            Erro
          </h1>
        </div>

        <div class="flex flex-col justify-center my-3">
          @for (msg of service.Messages; track $index) {
            <div class="flex items-center justify-center gap-2 mx-40">
              <i class="pi pi-info-circle text-[#ff675b]"></i>
              <p class="text-base text-gray-500" [innerHTML]="service.Messages[$index]"></p>
            </div>
          }
        </div>

        <div class="flex flex-row justify-center pb-4">
          <button 
            (click)="onCloseClick()" 
            class="bg-[#1bc95b] mt-2 mb-1 w-16 rounded-lg text-white font-semibold hover:scale-115 hover:cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  service = inject(ErrorDialogService)

  onCloseClick() {
    this.service.hidde()
  }
}
