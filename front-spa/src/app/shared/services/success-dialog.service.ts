import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService {
  private visibility = signal(false)
  private message = signal<string>("")
  private operation?: Function

  constructor() { }

  get IsVisible() { return this.visibility() }
  get Message() { return this.message() }

  setMessage(message: string) {
    this.message.set(message)
    return this
  }

  setOnConfirm(callback: Function) {
    this.operation = callback
    return this
  }

  hidde() { 
    this.visibility.set(false)
    this.message.set("")

    if (!this.operation) {
      return
    }
    this.operation()
  }

  show() { 
    this.visibility.set(true)
    return this
  }
}
