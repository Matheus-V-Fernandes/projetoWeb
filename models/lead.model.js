import { Model, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"
import Product from "./product.model.js"
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// Leads (manifestações de interesse)
class Lead extends Model {}
Lead.init(
  {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome_cliente: { type: DataTypes.STRING, allowNull: false},
    ProductId: { type: DataTypes.INTEGER, allowNull: false },
    telefone: { type: DataTypes.STRING, },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false },
    endereco: { type: DataTypes.STRING, allowNull: false },
    status: { 
        type: DataTypes.ENUM('pendente', 'contato','efetivado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    },
    data: { type: DataTypes.STRING },
    obs: { type: DataTypes.STRING },
    preco: { type: DataTypes.FLOAT, allowNull: false }
  },
  { sequelize: sequelize, timestamps: false },
)

Lead.belongsTo(Product)
Product.hasMany(Lead)
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export default Lead
