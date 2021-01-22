module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
          type: DataTypes.TEXT,
          allowNull:false,
      },
      brand:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl:{
          type: DataTypes.STRING,
          allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Product.associate = (models) => { 
      Product.belongsTo(models.Category);
      Product.hasMany(models.Cart);
      Product.hasMany(models.Review);
      Product.belongsToMany(models.User, {
        through: { model: models.Cart, unique: false },
      });
    };
  
    return Product;
  };