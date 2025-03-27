import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { Product } from '../../pages/product-list/models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Output() deleteProductEvent = new EventEmitter<string>();

  product = input<Product>();

  deleteProduct() {
    this.deleteProductEvent.emit(this.product()?.productName);
  }
}
