const { Sequelize } = require('sequelize'); // Importa o Sequelize
const dotenv = require('dotenv'); // Importa odotenv para carregar variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  logging: false, // Desativa o logging das queries SQL no console
});

module.exports = sequelize; // Exporta a instância do Sequelize para uso em outros módulos
