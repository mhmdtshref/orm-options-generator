import { Post } from './Post';
import { Comment } from './Comment';
import sequelize from './sequelize';

Post.hasMany(Comment);
Comment.belongsTo(Post);

export {
    Post,
    Comment,
    sequelize,
}