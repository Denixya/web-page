import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  #fb = inject(FormBuilder);
  constructor() {
    this.userForm = this.#fb.group({
      firstName: [''],
      lastName: [''],
      birthday: [''],
      dni: [''],
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
  }
}
