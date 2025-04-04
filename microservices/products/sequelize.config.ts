import { Sequelize } from 'sequelize-typescript';
import { Product } from './src/products.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'amart',
  password: process.env.DB_PASSWORD || 'amartroot',
  database: process.env.DB_NAME || 'vigysport',
  models: [Product],
  logging: false,
});

sequelize
  .sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada en Orders'))
  .catch((err) => console.error('Error al sincronizar BD en Orders: ', err));
