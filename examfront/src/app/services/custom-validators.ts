import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^[a-zA-Z0-9]{3,20}$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  };
}

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!pattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (!password) {
        return null; // No validation if the password is empty
      }
  
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\-]/.test(password);
  
      const isStrongPassword =
        password.length >= 8 &&
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar;
  
      return isStrongPassword ? null : { invalidPassword: true };
    };
  }

  export function confirmPasswordValidator(password: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const passwordControl = formGroup.value;
  
      if (!passwordControl || !password) {
        return null;
      }
  
      if (passwordControl !== password) {
        return { passwordsNotMatch: true };
      }
  
      return null;
    };
  }

  export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      if (!phoneNumber) {
        return null; // No validation if the phone number is empty
      }
  
      // Remove any non-numeric characters from the input
    //   const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
    //   console.log('numericPhoneNumber: ', numericPhoneNumber);
  
      // Check if the phone number is exactly 10 digits
      const isTenDigitPhoneNumber = (phoneNumber.toString()).length === 10;
  
      return isTenDigitPhoneNumber ? null : { invalidPhoneNumber: true };
    };
  }