import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductImage } from './product-image.model';
import { ProductDiscount } from './product-discount.model';
import { Category } from './category.model';
import { Collection } from './collection.model';

interface ProductAttributes {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: string;
  stock?: number;
  imageUrl?: string;
  isActive?: boolean;
  discount?: number;
}

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model<ProductAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  sku: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  stock: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId: string;

  @ForeignKey(() => Collection)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  collectionId: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  discount: number;

  @HasMany(() => ProductImage)
  images: ProductImage[];

  @HasMany(() => ProductDiscount)
  productDiscounts: ProductDiscount[];

  @BelongsTo(() => Collection)
  collection: Collection;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;
}
