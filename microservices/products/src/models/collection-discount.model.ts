import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Collection } from './collection.model';
import { Discount } from './discount.model';

@Table({ tableName: 'collection_discounts', timestamps: true })
export class CollectionDiscount extends Model {
  @ForeignKey(() => Collection)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  collectionId: string;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  discountId: string;

  @BelongsTo(() => Collection)
  collection: Collection;

  @BelongsTo(() => Discount)
  discount: Discount;
}
