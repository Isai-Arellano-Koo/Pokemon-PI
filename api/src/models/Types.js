const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('types', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false})
}   