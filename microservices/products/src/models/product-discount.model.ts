import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductDiscountAttributes {
  productId: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

@Table({ tableName: 'product_discounts', timestamps: true })
export class ProductDiscount extends Model<ProductDiscountAttributes> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  discount: number;

  @Column({
    type: DataType.ENUM('percentage', 'fixed'),
    allowNull: false,
  })
  discountType: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validFrom: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validUntil: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
