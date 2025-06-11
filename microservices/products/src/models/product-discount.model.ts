import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Discount } from './discount.model';

@Table({ tableName: 'product_discounts', timestamps: true })
export class ProductDiscount extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  discountId: string;
}
