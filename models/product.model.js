import { Model, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

class Product extends Model {}
Product.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING },
    imageAlt: { type: DataTypes.STRING },
    category: {
        type: DataTypes.ENUM('catalogo', 'oferta', 'destaque'),
        allowNull: false,
        defaultValue: 'catalogo'
    },
}, { sequelize: sequelize, timestamps: false })
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default Product