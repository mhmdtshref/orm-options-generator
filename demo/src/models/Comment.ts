import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

export class Comment extends Model {
    id: number;
    content: string;
}

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, { sequelize })