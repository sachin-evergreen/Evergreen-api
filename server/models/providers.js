export default (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
    },
    learn_and_earn: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.DOUBLE,
    },
    pay: {
      type: DataTypes.DOUBLE,
    },
    credit: {
      type: DataTypes.DOUBLE,
    },
    contact: {
      type: DataTypes.JSON,
    },
    logo: {
      type: DataTypes.STRING,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
    },
    financial_aid: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'providers',
  });

  Provider.associate = models => {
    Provider.belongsToMany(models.DataFields, {
      through: 'providers_datafields',
      foreignKey: 'provider_id',
      otherKey: 'datafield_id',
    });

    Provider.addScope('with_datafields', {
      include: [
        {
          model: models.DataFields,
        },
      ],
    });

    Provider.hasMany(models.Offers, {
      foreignKey: 'provider_id',
    });
  };

  return Provider;
};
