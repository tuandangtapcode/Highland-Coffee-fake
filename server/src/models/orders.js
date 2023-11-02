'use strict';
const { DataTypes, Model, DATE } = require('sequelize');

module.exports = (sequelize) => {

    class Orders extends Model {
        static associate({ Products, Customers }) {
            this.belongsTo(Products, {
                foreignKey: 'product_id',
            });
            this.belongsTo(Customers, {
                foreignKey: 'customer_id',
            });
        }
    };

    Orders.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            price: DataTypes.DOUBLE,
            status: {
                defaultValue: 'Chờ xác nhận',
                type: DataTypes.STRING
            },
            city: DataTypes.STRING,
            district: DataTypes.STRING,
            wards: DataTypes.STRING,
            address: DataTypes.STRING,
            created_date: DataTypes.STRING,
            phone: DataTypes.STRING,
            getted_date: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            confirmed_date: {
                type: DataTypes.STRING,
                defaultValue: null
            }
        },
        {
            sequelize,
            modelName: 'Orders',
            freezeTableName: true,
        }
    );

    return Orders;
}


