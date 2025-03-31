import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  readonly #fb = inject(FormBuilder);
  constructor() {
    this.userForm = this.#fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.maxLength(5)]],
      birthday: [''],
      dni: [''],
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
  }
}
