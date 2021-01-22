module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
      "review",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        timestamps: false,
      }
    );
  
   /* Review.associate = (models) => {
      Review.belongsTo(models.Product);
    };*/
    return Review;
  };