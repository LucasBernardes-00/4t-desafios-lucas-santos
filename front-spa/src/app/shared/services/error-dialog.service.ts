import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private visibility = signal(false)
  private messages = signal<string[]>([])

  constructor() { }

  get IsVisible() { return this.visibility() }
  get Messages() { return this.messages() }

  setMessages(messages: string[]) {
    this.messages.set(messages)
    return this
  }

  hidde() { 
    this.visibility.set(false)
    this.messages.set([])
  }

  show() { 
    this.visibility.set(true)
    return this
  }
}
