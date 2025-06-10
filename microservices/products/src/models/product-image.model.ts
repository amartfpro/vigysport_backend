import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductImageAttributes {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
}

@Table({ tableName: 'product_images', timestamps: true })
export class ProductImage extends Model<ProductImageAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  altText: string;
}
