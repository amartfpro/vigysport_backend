import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.model';

interface CategoryAttributes {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
}

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model<CategoryAttributes> {
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

  @HasMany(() => Product)
  products: Product[];
}
