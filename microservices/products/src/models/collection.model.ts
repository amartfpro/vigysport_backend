import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface CollectionAttributes {
  id: string;
  name: string;
  description?: string;
  releaseDate: Date;
  endDate?: Date;
  isActive?: boolean;
}

@Table({ tableName: 'collections', timestamps: true })
export class Collection extends Model<CollectionAttributes> {
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
    type: DataType.DATE,
    allowNull: false,
  })
  releaseDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
