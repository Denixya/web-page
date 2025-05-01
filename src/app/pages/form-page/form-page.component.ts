import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkInProgressComponent } from '../../components/work-in-progress/work-in-progress.component';
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { FormItem } from './models/form-page.model';

@Component({
  selector: 'app-form-page',
  standalone: true,
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
  imports: [ReactiveFormsModule, WorkInProgressComponent, FormCardComponent], // 👈 AÑADE ESTO
})
export class FormPageComponent {
  showPassword = signal(false);
  form = signal<FormGroup>(new FormGroup({}));
  formData = signal<FormItem[]>([]);

  constructor(private fb: FormBuilder) {
    this.form.set(this.createForm());
    this.loadFormData();
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', [Validators.required, this.ageValidator(13)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        url: ['', Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)],
        aboutYou: this.fb.control('', [this.maxWordsValidator(50)]),
        storage: ['session', Validators.required],
      },
      {
        validators: this.matchPasswords('password', 'confirmPassword'),
      },
    );
  }

  loadFormData(): void {
    const data = sessionStorage.getItem('formData');
    if (data) {
      this.formData.set(JSON.parse(data) as FormItem[]);
    }
  }

  private ageValidator(minAge: number) {
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

  private matchPasswords(passwordKey: string, confirmKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirm = group.get(confirmKey)?.value;
      return password === confirm ? null : { passwordsMismatch: true };
    };
  }

  getControl(name: string): AbstractControl {
    return this.form().get(name)!;
  }

  onSubmit(): void {
    const formGroup = this.form();
    if (formGroup.valid) {
      const formValue = formGroup.value as FormItem;

      // Añadir nuevo valor al array
      const updatedData = [...this.formData(), formValue];
      this.formData.set(updatedData);

      // Guardar en sessionStorage como array
      sessionStorage.setItem('formData', JSON.stringify(updatedData));

      console.log('Formulario enviado:', formGroup.value);
    } else {
      formGroup.markAllAsTouched();
    }
  }

  getAboutYouWordCount(): number {
    const value = this.getControl('aboutYou').value as string;
    if (!value) return 0;
    return value
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;
  }

  maxWordsValidator(maxWords: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) return null;

      const wordCount: number = value
        .trim()
        .split(/\s+/)
        .filter((word: string) => word.length > 0).length;

      return wordCount > maxWords
        ? { maxWords: { required: maxWords, actual: wordCount } }
        : null;
    };
  }
}
