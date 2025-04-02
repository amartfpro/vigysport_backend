import { Sequelize } from 'sequelize-typescript';
import { User } from '../microservices/users/src/users.model';
import { Product } from '../microservices/products/src/products.model';
import { Order } from '../microservices/orders/src/orders.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'amart',
  password: process.env.DB_PASSWORD || 'amartroot',
  database: process.env.DB_NAME || 'vigysport',
  models: [User, Product, Order],
  logging: false,
});

sequelize
  .sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada en Api-Gateway'))
  .catch((err) =>
    console.error('Error al sincronizar BD en Api-Gateway: ', err),
  );
