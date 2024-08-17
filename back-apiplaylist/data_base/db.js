const { Sequelize } = require('sequelize'); // Importa o Sequelize
const dotenv = require('dotenv'); // Importa odotenv para carregar variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Cria uma nova instância do Sequelize com a string de conexão do banco de dados
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

module.exports = sequelize; // Exporta a instância do Sequelize para uso em outros módulos
