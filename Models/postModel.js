const { DataTypes } = require('sequelize');
const { sequelize } = require('./userModel'); // Import existing Sequelize instance
const { User } = require('./userModel');

const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    images: { type: DataTypes.JSON }, // Note: Replace JSON for relational DB as necessary
}, {
    timestamps: true,
});

// Establish relationships
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Post };
