import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: { underscored: true, timestamps: true },
  logging: false,
  pool: {
    max: 20,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
});

export default sequelize;
