import { Column, DataType, Model, Table } from 'sequelize-typescript'; // HasMany
// import { Order } from './order.model';
import { Optional } from 'sequelize';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  isActive: boolean;
  lastLogin?: Date;
  isEmailVerified?: boolean;
  profilePicture?: string;
  isSubscribedToNewsletter?: boolean;
  birthDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'role'
  | 'isActive'
  | 'lastLogin'
  | 'isEmailVerified'
  | 'profilePicture'
  | 'isSubscribedToNewsletter'
  | 'birthDate'
  | 'createdAt'
  | 'updatedAt'
>;

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  // Sin username
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  })
  role: 'admin' | 'user';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLogin: Date;

  // Información de verificación
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isEmailVerified: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isSubscribedToNewsletter: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate: Date;

  // @HasMany(() => Order)
  // orders: Order[];
}
