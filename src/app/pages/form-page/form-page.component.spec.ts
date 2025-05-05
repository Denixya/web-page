// form-page.component.spec.ts
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormPageComponent } from './form-page.component';
import { FormItem } from './models/form-page.model';

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;
  let sessionGetSpy: jasmine.Spy;
  let sessionSetSpy: jasmine.Spy;
  let localGetSpy: jasmine.Spy;
  let localSetSpy: jasmine.Spy;

  beforeEach(async () => {
    // Inicializamos storages vacíos
    sessionStorage.clear();
    localStorage.clear();
    sessionGetSpy = spyOn(sessionStorage, 'getItem').and.callFake(
      (key: string) => '[]',
    );
    sessionSetSpy = spyOn(sessionStorage, 'setItem').and.callThrough();
    localGetSpy = spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => '[]',
    );
    localSetSpy = spyOn(localStorage, 'setItem').and.callThrough();

    await TestBed.configureTestingModule({
      imports: [FormPageComponent, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA], // ignorar form-card
    }).compileComponents();

    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with all controls', () => {
    const f = component.form();
    const keys = [
      'firstName',
      'lastName',
      'email',
      'birthDate',
      'password',
      'confirmPassword',
      'phone',
      'url',
      'aboutYou',
      'storage',
    ];
    expect(Object.keys(f.controls)).toEqual(keys);
  });

  describe('basic validators', () => {
    let control: AbstractControl;

    it('firstName should require at least 2 letters', () => {
      control = component.getControl('firstName');
      control.setValue('');
      expect(control.hasError('required')).toBeTrue();
      control.setValue('A');
      expect(control.hasError('minlength')).toBeTrue();
      control.setValue('1A');
      expect(control.hasError('pattern')).toBeTrue();
      control.setValue('Ana');
      expect(control.valid).toBeTrue();
    });

    it('lastName same as firstName', () => {
      control = component.getControl('lastName');
      control.setValue('B');
      expect(control.invalid).toBeTrue();
      control.setValue('López');
      expect(control.valid).toBeTrue();
    });

    it('email validator', () => {
      control = component.getControl('email');
      control.setValue('not-an-email');
      expect(control.hasError('email')).toBeTrue();
      control.setValue('a@b.com');
      expect(control.valid).toBeTrue();
    });
  });

  describe('custom ageValidator', () => {
    let birth: AbstractControl;

    beforeEach(() => {
      birth = component.getControl('birthDate');
    });

    it('should error if under minAge', () => {
      // hoy es 2025-05-03
      birth.setValue('2012-05-04'); // 12 años 364 días
      expect(birth.hasError('ageTooLow')).toBeTrue();
    });

    it('should accept exactly minAge', () => {
      birth.setValue('2012-05-03');
      expect(birth.errors).toBeNull();
    });
  });

  describe('matchPasswords validator', () => {
    let form = () => component.form();

    it('should error when passwords do not match', () => {
      form().get('password')!.setValue('Passw0rd!');
      form().get('confirmPassword')!.setValue('Different1!');
      form().updateValueAndValidity();
      expect(form().hasError('passwordsMismatch')).toBeTrue();
    });

    it('should pass when passwords match', () => {
      form().get('password')!.setValue('Aa1!aaaa');
      form().get('confirmPassword')!.setValue('Aa1!aaaa');
      form().updateValueAndValidity();
      expect(form().errors).toBeNull();
    });
  });

  it('getAboutYouWordCount should count words correctly', () => {
    const about = component.getControl('aboutYou');
    about.setValue('');
    expect(component.getAboutYouWordCount()).toBe(0);
    about.setValue('one two   three');
    expect(component.getAboutYouWordCount()).toBe(3);
  });

  it('maxWordsValidator should enforce max words', () => {
    const validator = component.maxWordsValidator(2);
    let ctrl = { value: '' } as AbstractControl;
    expect(validator(ctrl)).toBeNull();
    ctrl = { value: 'one two' } as AbstractControl;
    expect(validator(ctrl)).toBeNull();
    ctrl = { value: 'one two three' } as AbstractControl;
    const err = validator(ctrl) as ValidationErrors;
    expect(err['maxWords']).toBeDefined();
    expect(err['maxWords'].actual).toBe(3);
    expect(err['maxWords'].required).toBe(2);
  });

  describe('onSubmit branches', () => {
    let fGroup = () => component.form();

    beforeEach(() => {
      // Controlamos que formData inicial esté vacío
      sessionGetSpy.and.returnValue('[]');
      localGetSpy.and.returnValue('[]');
      component.loadFormData();
    });

    it('should mark all touched if invalid and return', () => {
      spyOn(fGroup(), 'markAllAsTouched');
      fGroup().get('firstName')!.setValue('');
      component.onSubmit();
      expect(fGroup().markAllAsTouched).toHaveBeenCalled();
    });

    it('should detect duplicate email and set error', () => {
      // pre-cargamos un item con email dup@example.com
      sessionGetSpy.and.returnValue(
        JSON.stringify([{ email: 'dup@example.com', storage: 'session' }]),
      );
      component.loadFormData();
      // rellenamos los campos mínimos válidos
      fGroup().patchValue({
        firstName: 'Ana',
        lastName: 'Pérez',
        email: 'dup@example.com',
        birthDate: '2000-01-01',
        password: 'Aa1!aaaa',
        confirmPassword: 'Aa1!aaaa',
        phone: '1234',
        url: '',
        aboutYou: '',
        storage: 'session',
      });
      component.onSubmit();
      expect(
        component.getControl('email').hasError('duplicateEmail'),
      ).toBeTrue();
      // no debería invocar storage.setItem para agregar
      expect(sessionSetSpy).not.toHaveBeenCalledWith(
        'formData',
        jasmine.any(String),
      );
    });

    it('should save to sessionStorage on valid submit', () => {
      // no duplicates
      sessionGetSpy.and.returnValue('[]');
      component.loadFormData();
      fGroup().patchValue({
        firstName: 'Ana',
        lastName: 'Pérez',
        email: 'a@b.com',
        birthDate: '2000-01-01',
        password: 'Aa1!aaaa',
        confirmPassword: 'Aa1!aaaa',
        phone: '1234',
        url: '',
        aboutYou: '',
        storage: 'session',
      });
      component.onSubmit();
      // sessionStorage updated
      expect(sessionSetSpy).toHaveBeenCalledWith(
        'formData',
        JSON.stringify([
          {
            firstName: 'Ana',
            lastName: 'Pérez',
            email: 'a@b.com',
            birthDate: '2000-01-01',
            password: 'Aa1!aaaa',
            confirmPassword: 'Aa1!aaaa',
            phone: '1234',
            url: '',
            aboutYou: '',
            storage: 'session',
          },
        ]),
      );
      // form reset mantiene storage en 'session'
      expect(fGroup().get('storage')!.value).toBe('session');
    });

    it('should save to localStorage when storage is local', () => {
      sessionGetSpy.and.returnValue('[]');
      component.loadFormData();

      const f = component.form();
      f.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'x@x.com',
        birthDate: '2000-01-01',
        password: 'Aa1!aaaa',
        confirmPassword: 'Aa1!aaaa',
        phone: '0000',
        url: '',
        aboutYou: '',
        storage: 'local',
      });

      component.onSubmit();

      expect(localSetSpy).toHaveBeenCalledWith(
        'formData',
        jasmine.stringMatching(/"storage":"local"/),
      );
    });
  });

  it('loadFormData should combine session and local', () => {
    sessionGetSpy.and.returnValue(
      JSON.stringify([{ email: 's@a.com', storage: 'session' }]),
    );
    localGetSpy.and.returnValue(
      JSON.stringify([{ email: 'l@b.com', storage: 'local' }]),
    );
    component.loadFormData();
    const data = component.formData();
    expect(data.length).toBe(2);
    expect(data.find((i) => i.email === 's@a.com')).toBeDefined();
    expect(data.find((i) => i.email === 'l@b.com')).toBeDefined();
  });

  it('onDeleteFormItem should remove item and update storages', () => {
    // pre-cargamos formData signal
    const items: FormItem[] = [
      { email: 'a@a.com', storage: 'session' } as any,
      { email: 'b@b.com', storage: 'local' } as any,
    ];
    component.formData.set(items);
    component.onDeleteFormItem('a@a.com');
    const remaining = component.formData();
    expect(remaining.length).toBe(1);
    expect(remaining[0].email).toBe('b@b.com');
    // sessionStorage contiene sólo los session
    expect(sessionSetSpy).toHaveBeenCalledWith('formData', JSON.stringify([]));
    // localStorage contiene sólo los local
    expect(localSetSpy).toHaveBeenCalledWith(
      'formData',
      JSON.stringify([{ email: 'b@b.com', storage: 'local' }]),
    );
  });
});
