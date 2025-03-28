import { Component, effect, inject, signal } from '@angular/core';
import { Product } from './models/product.model';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../components/product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  // Signal con la lista de productos
  productsSignal = signal<Product[]>([]);

  totalPrice = signal(0);

  constructor() {
    effect(() => {
      const products = this.productsSignal();
      let totalPrice = 0;

      if (products.length > 0) {
        console.log('dentro');
        totalPrice = products.reduce(
          (acc, product) => acc + product.productPrice,
          0
        );
      }

      this.totalPrice.set(totalPrice);
    });
  }

  // newProductName and newProductPrice
  newProductName = signal('');
  newProductPrice = signal(0);

  resetNewProducts() {
    this.newProductName.set('');
    this.newProductPrice.set(0);
  }

  // Añadir nuevo producto
  addProduct() {
    const newProduct: Product = {
      productName: this.newProductName(),
      productPrice: this.newProductPrice(),
    };
    console.log('product', newProduct);
    this.productsSignal.update((products) => [...products, newProduct]);
    this.resetNewProducts();
  }

  onDeleteProduct(productName: string) {
    console.log(productName);
    for (let i = 0; i <= this.productsSignal().length; i++) {}

    this.productsSignal.set(
      this.productsSignal().filter(
        (product) => product.productName !== productName
      )
    );
  }
}
