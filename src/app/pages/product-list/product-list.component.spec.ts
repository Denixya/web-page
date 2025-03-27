import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { signal } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export const productSignal = signal({
  id: null,
  name: '',
  price: 0,
  inStock: true,
});

// Función para actualizar el producto
export const updateProduct = (newProduct) => {
  productSignal.value = { ...productSignal.value, ...newProduct };
};
