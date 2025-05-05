import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { FormItem } from './models/form-page.model';
import { FormValidatorsService } from './services/form-validators.service';
import { FormStorageService } from './services/form-storage.service'; // nuevo servicio

@Component({
  selector: 'app-form-page',
  standalone: true,
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
  imports: [ReactiveFormsModule, FormCardComponent],
})
export class FormPageComponent {
  showPassword = signal(false);
  form = signal<FormGroup>(new FormGroup({}));
  formData = signal<FormItem[]>([]);

  constructor(
    private fb: FormBuilder,
    private formStorageService: FormStorageService,
    private validatorsService: FormValidatorsService,
  ) {
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
        birthDate: [
          '',
          [Validators.required, this.validatorsService.ageValidator(13)],
        ],
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
        aboutYou: this.fb.control('', [
          this.validatorsService.maxWordsValidator(50),
        ]),
        storage: ['session', Validators.required],
      },
      {
        validators: this.validatorsService.matchPasswords(
          'password',
          'confirmPassword',
        ),
      },
    );
  }

  getControl(name: string): AbstractControl {
    return this.form().get(name)!;
  }

  onSubmit(): void {
    const formGroup = this.form();
    if (!formGroup.valid) {
      formGroup.markAllAsTouched();
      return;
    }

    const formValue = formGroup.value as FormItem;
    const allData = this.formData();

    if (allData.some((item) => item.email === formValue.email)) {
      this.getControl('email').setErrors({ duplicateEmail: true });
      return;
    }

    this.formStorageService.updateFormData(formValue, formValue.storage);
    this.loadFormData();
    formGroup.reset({ storage: 'session' });
  }

  loadFormData(): void {
    this.formData.set(this.formStorageService.getAllFormData());
  }

  getAboutYouWordCount(): number {
    const value = this.getControl('aboutYou').value as string;
    return this.validatorsService.getWordCount(value || '');
  }

  onDeleteFormItem(email: string): void {
    this.formStorageService.deleteFormItem(email);
    this.loadFormData();
  }
}
