import {
  Table,
  Column,
  Model,
  DataType,
  // ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
// import { Product } from '../../products/src/products.model';

interface OrderAttributes {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
type OrderCreationAttributes = Optional<
  OrderAttributes,
  'id' | 'created_at' | 'updated_at'
>;

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  // @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;
}
