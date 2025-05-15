import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sessionStorage methods', () => {
    beforeEach(() => sessionStorage.clear());

    it('should set and get session item', () => {
      service.setSessionItem('testKey', { value: 42 });
      const result = service.getSessionItem<{ value: number }>('testKey');
      expect(result).toEqual({ value: 42 });
    });

    it('should remove session item', () => {
      service.setSessionItem('testKey', 'testValue');
      service.removeSessionItem('testKey');
      expect(service.getSessionItem('testKey')).toBeNull();
    });
  });

  describe('localStorage methods', () => {
    beforeEach(() => localStorage.clear());

    it('should set and get local item', () => {
      service.setLocalItem('testKey', [1, 2, 3]);
      const result = service.getLocalItem<number[]>('testKey');
      expect(result).toEqual([1, 2, 3]);
    });

    it('should remove local item', () => {
      service.setLocalItem('testKey', 'value');
      service.removeLocalItem('testKey');
      expect(service.getLocalItem('testKey')).toBeNull();
    });
  });

  describe('getAllData', () => {
    it('should combine data from session and local', () => {
      sessionStorage.setItem('key', JSON.stringify([{ value: 's' }]));
      localStorage.setItem('key', JSON.stringify([{ value: 'l' }]));
      const result = service.getAllData<{ value: string }>('key');
      expect(result.length).toBe(2);
    });
  });

  describe('getFilteredData', () => {
    it('should filter by origin and apply mapFn', () => {
      const data = [
        { origin: 'form', data: 1 },
        { origin: 'form', data: 2 },
        { origin: 'other', data: 3 },
      ];
      localStorage.setItem('key', JSON.stringify(data));
      const result = service.getFilteredData<number>(
        'key',
        'form',
        (item) => item.data,
      );
      expect(result).toEqual([1, 2]);
    });
  });

  describe('updateData', () => {
    it('should update item by id', () => {
      localStorage.setItem('key', JSON.stringify([{ id: 1, val: 'a' }]));
      service.updateData({ id: 1, val: 'b' }, 'local', 'key');
      const result = service.getLocalItem<{ id: number; val: string }[]>('key');
      expect(result?.[0].val).toBe('b');
    });
  });

  describe('deleteData', () => {
    it('should delete by id with optional predicate', () => {
      const items = [
        { id: '1', value: 1 },
        { id: '2', value: 2 },
      ];
      sessionStorage.setItem('key', JSON.stringify(items));
      service.deleteData('key', '2', 'id');
      const result = service.getSessionItem<{ id: string }[]>('key');
      expect(result?.find((i) => i.id === '2')).toBeUndefined();
    });
  });
});
