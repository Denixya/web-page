import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Guarda un valor en el sessionStorage.
   * @param key Clave bajo la cual se almacenará el valor.
   * @param value Valor a almacenar (cualquier tipo de dato serializable).
   */
  setSessionItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtiene un valor desde sessionStorage.
   * @param key Clave del valor a recuperar.
   * @returns El valor almacenado (parseado como tipo T), o null si no existe.
   */
  getSessionItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Elimina un valor del sessionStorage.
   * @param key Clave del valor a eliminar.
   */
  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Guarda un valor en el localStorage.
   * @param key Clave bajo la cual se almacenará el valor.
   * @param value Valor a almacenar (cualquier tipo de dato serializable).
   */
  setLocalItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtiene un valor desde localStorage.
   * @param key Clave del valor a recuperar.
   * @returns El valor almacenado (parseado como tipo T), o null si no existe.
   */
  getLocalItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Elimina un valor del localStorage.
   * @param key Clave del valor a eliminar.
   */
  removeLocalItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Devuelve todos los datos sin filtrar por origen (session + local).
   *
   * @param key Clave de los datos almacenados.
   */
  getAllData<T>(key: string): T[] {
    const session = this.getSessionItem<T[]>(key) || [];
    const local = this.getLocalItem<T[]>(key) || [];
    return [...session, ...local];
  }

  /**
   * Devuelve todos los datos combinados (session + local) que tengan el origen especificado.
   *
   * @param key Clave de los datos almacenados.
   * @param origin Origen a filtrar (por ejemplo, 'form').
   * @param mapFn Función opcional para transformar los resultados (como obtener solo item.data).
   */
  getFilteredData<T>(
    key: string,
    origin: string,
    mapFn: (item: any) => T = (item) => item,
  ): T[] {
    const allData = this.getAllData<any>(key);
    return allData.filter((item) => item.origin === origin).map(mapFn);
  }

  /**
   * Actualiza los datos existentes, sobrescribiendo por id si ya existe uno igual (por clave anidada).
   *
   * @param newItem Elemento a agregar.
   * @param storage Tipo de almacenamiento: 'session' o 'local'.
   * @param key Clave de almacenamiento.
   * @param idPath Ruta del identificador único (por defecto 'id').
   */
  updateData<T>(
    newItem: T,
    storage: 'session' | 'local',
    key: string,
    idPath: string = 'id',
  ): void {
    const existing =
      storage === 'session'
        ? this.getSessionItem<T[]>(key) || []
        : this.getLocalItem<T[]>(key) || [];

    const getId = (item: any): any =>
      idPath.split('.').reduce((obj, prop) => obj?.[prop], item);

    const filtered = existing.filter((item) => getId(item) !== getId(newItem));
    const updated = [...filtered, newItem];

    if (storage === 'session') {
      this.setSessionItem(key, updated);
    } else {
      this.setLocalItem(key, updated);
    }
  }

  /**
   * Elimina un elemento por id (usando clave anidada), y permite aplicar una condición opcional.
   *
   * @param key Clave del almacenamiento.
   * @param id Id del elemento a eliminar.
   * @param idPath Ruta del id a comparar (por defecto 'id').
   * @param predicate Función opcional para limitar qué elementos eliminar.
   */
  deleteData<T>(
    key: string,
    id: string,
    idPath: string = 'id',
    predicate?: (item: T) => boolean,
  ): void {
    const getId = (item: any): any =>
      idPath.split('.').reduce((obj, prop) => obj?.[prop], item);

    const session = (this.getSessionItem<T[]>(key) || []).filter(
      (item) => getId(item) !== id || (predicate && !predicate(item)),
    );

    const local = (this.getLocalItem<T[]>(key) || []).filter(
      (item) => getId(item) !== id || (predicate && !predicate(item)),
    );

    this.setSessionItem(key, session);
    this.setLocalItem(key, local);
  }
}
