import { Injectable } from '@angular/core';
import { FormItem } from '../models/form-page.model';
import { StorageService } from '../../../services/storage.service';

@Injectable({ providedIn: 'root' })
export class FormStorageService {
  private key = 'formData';

  constructor(private storageService: StorageService) {}

  /**
   * Obtiene todos los elementos del formulario almacenados, dejando que el StorageService filtre por origen.
   *
   * @returns Un array de objetos FormItem cuyo origen es 'form'.
   */
  getAllFormData(): FormItem[] {
    return this.storageService.getFilteredData(
      this.key,
      'form',
      (item) => item.data,
    );
  }

  /**
   * Añade o actualiza un elemento del formulario, incluyendo manualmente el campo 'origin: form'.
   *
   * @param newItem Objeto FormItem a almacenar.
   * @param storage Tipo de almacenamiento: 'session' o 'local'.
   */
  updateFormData(newItem: FormItem, storage: 'session' | 'local'): void {
    const wrappedItem = { origin: 'form', data: newItem };
    this.storageService.updateData(
      wrappedItem,
      storage,
      this.key,
      'data.email',
    );
  }

  /**
   * Elimina un elemento del formulario por email. Solo elimina elementos con origen 'form'.
   *
   * @param email Email del FormItem a eliminar.
   */
  deleteFormItem(email: string): void {
    this.storageService.deleteData<{ origin: string; data: FormItem }>(
      this.key,
      email,
      'data.email',
      (item) => item.origin === 'form',
    );
  }
}
