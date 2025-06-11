import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Collection } from './collection.model';

interface CollectionDiscountAttributes {
  id: string;
  collectionId: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

@Table({ tableName: 'collection_discounts', timestamps: true })
export class CollectionDiscount extends Model<CollectionDiscountAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Collection)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  collectionId: string;

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
