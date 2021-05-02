import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

export class Post extends Model {
    id: number;
    content: string;
    username: string;
}

Post.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false,
    }
}, { sequelize })
