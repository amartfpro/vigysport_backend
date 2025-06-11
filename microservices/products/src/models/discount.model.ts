import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ProductDiscount } from './product-discount.model';
import { CollectionDiscount } from './collection-discount.model';

@Table({ tableName: 'discounts', timestamps: true })
export class Discount extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  discountType: string; // ['product', 'collection', 'code', 'seasonal']

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  discountValueType: string; // ['percentage', 'fixed']

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

  @HasMany(() => ProductDiscount)
  productDiscounts: ProductDiscount[];

  @HasMany(() => CollectionDiscount)
  collectionDiscounts: CollectionDiscount[];
}
