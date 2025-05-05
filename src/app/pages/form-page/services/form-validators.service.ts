import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidatorsService {
  /**
   * Valida si la edad de una persona es mayor o igual a la edad mínima.
   * @param minAge Edad mínima que debe tener el usuario.
   * @returns Función de validación para verificar si la edad es válida.
   */
  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      if (isNaN(birthDate.getTime())) return null;

      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      const isOldEnough =
        age > minAge ||
        (age === minAge &&
          (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

      return isOldEnough ? null : { ageTooLow: true };
    };
  }

  /**
   * Valida que las contraseñas coincidan.
   * @param passwordKey Clave del campo de contraseña en el formulario.
   * @param confirmKey Clave del campo de confirmación de la contraseña en el formulario.
   * @returns Función de validación para verificar que las contraseñas coincidan.
   */
  matchPasswords(passwordKey: string, confirmKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const form = group as FormGroup;
      const password = form.get(passwordKey)?.value;
      const confirm = form.get(confirmKey)?.value;
      return password === confirm ? null : { passwordsMismatch: true };
    };
  }

  /**
   * Valida que el número de palabras no supere el límite especificado.
   * @param maxWords Número máximo de palabras permitidas.
   * @returns Función de validación para contar las palabras y verificar el límite.
   */
  maxWordsValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) return null;

      const wordCount = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      return wordCount > maxWords
        ? { maxWords: { required: maxWords, actual: wordCount } }
        : null;
    };
  }

  /**
   * Calcula el número de palabras en un texto dado.
   * @param value Texto para contar las palabras.
   * @returns Número de palabras en el texto.
   */
  getWordCount(value: string): number {
    return value
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;
  }
}
