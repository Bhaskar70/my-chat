import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appMinLength]',
})
export class MinLengthDirective {
    private errorMessage: HTMLElement;
    constructor(private el: ElementRef<HTMLInputElement>,private ngControl: NgControl,private renderer: Renderer2) {
        this.errorMessage = this.renderer.createElement('div');
        this.renderer.addClass(this.errorMessage, 'error-message');
        this.renderer.setStyle(this.errorMessage, 'display', 'none');
        this.renderer.setStyle(this.errorMessage,'color' ,'red');
        this.renderer.setStyle(this.errorMessage , 'text-align','start')
        this.renderer.setStyle(this.errorMessage , 'padding','10px')
        this.renderer.appendChild(this.el.nativeElement.parentElement, this.errorMessage);
        this.el.nativeElement.autocomplete = 'off';
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
      const maxLength = 10; 
      console.log(value)
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length > maxLength) {
        const trimmedValue = numericValue.slice(0, maxLength);
        this.setInputValue(trimmedValue);
        this.el.nativeElement.setCustomValidity('Maximum length exceeded');
        this.errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Minium Length Excced'
        this.renderer.setStyle(this.errorMessage, 'display', 'block');
        setTimeout(() => {
            this.renderer.setStyle(this.errorMessage, 'display', 'none');
        }, 2000)
      } else {
        this.setInputValue(numericValue);
        this.el.nativeElement.setCustomValidity('');
        this.renderer.setStyle(this.errorMessage, 'display', 'none');
      }
    }


    @HostListener('blur')
    onBlur() {
        const numericValue = this.el.nativeElement.value.replace(/\D/g, '');
        if (numericValue.length < 10) {
            this.errorMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Minium Length is Reqiured'
            this.renderer.setStyle(this.errorMessage, 'display', 'block');
        }
    }

    private setInputValue(value: string): void {
      this.el.nativeElement.value = value;
    }
}