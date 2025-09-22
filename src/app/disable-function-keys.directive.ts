import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableFunctionKeys]',
  standalone: true
})
export class DisableFunctionKeysDirective {
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const functionKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10','F11','F12'];
    if (functionKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  constructor() { }

}
