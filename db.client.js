const { Sequelize } = require('sequelize')

// database
const sequelize = new Sequelize(
  process.env.bn_name, // Database name
  process.env.bn_user, // User
  process.env.bn_psd, // Password
  {
    host: process.env.bn_host, // Host
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;