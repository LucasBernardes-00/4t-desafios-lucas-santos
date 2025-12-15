import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmActionService {
  private visibility = signal(false)
  private title = signal<string>("")
  private operation?: Function

  constructor() { }

  get IsVisible() { return this.visibility() }
  get Title() { return this.title() }

  setTitle(title: string) {
    this.title.set(title)
    return this
  }

  setOnConfirm(callback: Function) {
    this.operation = callback
    return this
  }

  hidde() { 
    this.visibility.set(false)
    this.title.set("")
  }

  show() { 
    this.visibility.set(true)
    return this
  }

  onExecuteOperation() {
    if (!this.operation) return 
    
    this.operation()
    this.title.set("")
    this.visibility.set(false)
  }
}
