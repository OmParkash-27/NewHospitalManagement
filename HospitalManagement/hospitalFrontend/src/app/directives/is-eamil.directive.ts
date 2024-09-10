import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appIsEamil]',
  providers: [ {
    provide: NG_VALIDATORS,
    useExisting: IsEamilDirective,
    multi: true

  } ]
})
export class IsEamilDirective implements Validators {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    // const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // const isEmailValid = patt.test(control.value);
    // return isEmailValid ? null : {'invalidEmail': true} 

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (control.value && !emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }

    return null;
  }
  

}
