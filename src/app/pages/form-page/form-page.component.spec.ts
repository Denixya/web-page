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
import { FormStorageService } from './services/form-storage.service';
import { FormValidatorsService } from './services/form-validators.service';

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  let mockStorageService: jasmine.SpyObj<FormStorageService>;
  let mockValidatorsService: jasmine.SpyObj<FormValidatorsService>;

  beforeEach(async () => {
    mockStorageService = jasmine.createSpyObj('FormStorageService', [
      'getAllFormData',
      'updateFormData',
      'deleteFormItem',
    ]);

    mockValidatorsService = jasmine.createSpyObj('FormValidatorsService', [
      'ageValidator',
      'maxWordsValidator',
      'matchPasswords',
      'getWordCount',
    ]);

    // valores por defecto
    mockStorageService.getAllFormData.and.returnValue([]);
    mockValidatorsService.ageValidator.and.callFake(() => () => null);
    mockValidatorsService.maxWordsValidator.and.callFake(() => () => null);
    mockValidatorsService.matchPasswords.and.returnValue(() => null);
    mockValidatorsService.getWordCount.and.callFake((val: string) =>
      val.trim() ? val.trim().split(/\s+/).length : 0,
    );

    await TestBed.configureTestingModule({
      imports: [FormPageComponent, ReactiveFormsModule],
      providers: [
        { provide: FormStorageService, useValue: mockStorageService },
        { provide: FormValidatorsService, useValue: mockValidatorsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

  describe('getAboutYouWordCount', () => {
    it('should delegate to validatorsService.getWordCount', () => {
      const spy = mockValidatorsService.getWordCount;
      const control = component.getControl('aboutYou');
      control.setValue('Hello world test');
      component.getAboutYouWordCount();
      expect(spy).toHaveBeenCalledWith('Hello world test');
    });
  });

  describe('onSubmit', () => {
    const validForm: FormItem = {
      firstName: 'Ana',
      lastName: 'Pérez',
      email: 'ana@example.com',
      birthDate: '2000-01-01',
      password: 'Aa1!aaaa',
      confirmPassword: 'Aa1!aaaa',
      phone: '1234',
      url: '',
      aboutYou: '',
      storage: 'session',
    };

    beforeEach(() => {
      mockStorageService.getAllFormData.and.returnValue([]);
      component.form().patchValue(validForm);
    });

    it('should mark all as touched and return if form is invalid', () => {
      const form = component.form();
      form.get('firstName')!.setValue('');
      spyOn(form, 'markAllAsTouched');
      component.onSubmit();
      expect(form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should set duplicateEmail error if email exists', () => {
      mockStorageService.getAllFormData.and.returnValue([
        { ...validForm, email: 'ana@example.com' },
      ]);
      component.loadFormData();
      component.onSubmit();
      expect(
        component.getControl('email').hasError('duplicateEmail'),
      ).toBeTrue();
      expect(mockStorageService.updateFormData).not.toHaveBeenCalled();
    });

    it('should call updateFormData and reset the form if valid', () => {
      component.onSubmit();
      expect(mockStorageService.updateFormData).toHaveBeenCalledWith(
        validForm,
        'session',
      );
      expect(component.form().get('storage')!.value).toBe('session');
    });
  });

  it('loadFormData should set formData from service', () => {
    const data = [{ email: 'a@b.com', storage: 'session' } as FormItem];
    mockStorageService.getAllFormData.and.returnValue(data);
    component.loadFormData();
    expect(component.formData()).toEqual(data);
  });

  it('onDeleteFormItem should call delete and reload', () => {
    const spy = mockStorageService.deleteFormItem;
    component.onDeleteFormItem('a@b.com');
    expect(spy).toHaveBeenCalledWith('a@b.com');
    expect(mockStorageService.getAllFormData).toHaveBeenCalled();
  });
});
