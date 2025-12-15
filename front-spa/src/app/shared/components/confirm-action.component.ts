import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmActionService } from '../services/modal-confirmation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirmation',
  imports: [CommonModule],
  template: `
    <div 
      #confirmationModal 
      class="z-40 h-full w-full top-0 start-0 absolute bg-gray-300/50 p-3 hidden"
      [ngClass]="{
        'hidden': !service.IsVisible
      }"
    >
      <div class="z-50 absolute top-[30%] start-[40%] w-80 h-30 bg-white rounded-xl">
        <div class="flex justify-end pr-2 pt-2">
          <button 
            (click)="onCloseClick()" 
            class="hover:scale-125 hover:cursor-pointer"
          >
            <i class="pi pi-times text-gray-500" style="font-size: 1rem"></i>
          </button>
        </div>

        <div class="flex justify-center">
          <h1 class="text-base text-gray-500">{{ service.Title }}</h1>
        </div>

        <div class="flex flex-row justify-evenly pt-4">
          <button 
            (click)="service.onExecuteOperation()"
            class="bg-gray-200 py-1 px-3 rounded-lg font-semibold hover:scale-115 hover:cursor-pointer"
          >
            Confirmar operação
          </button>
          <button (click)="onCloseClick()" class="bg-[#ff675b] p-1 rounded-lg text-white font-semibold hover:scale-115 hover:cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmActionComponent {
  service = inject(ConfirmActionService)

  onCloseClick() {
    this.service.hidde()
  }
}
