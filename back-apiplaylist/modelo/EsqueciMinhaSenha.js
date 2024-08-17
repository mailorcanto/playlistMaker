const Sequelize = require('sequelize'); 
const database = require('../data_base/db');
const Usuario = require('./Usuario'); 

const EsqueciMinhaSenha = database.define('esqueci_minha_senha', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
  },
  usuarioId: {
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: {
      model: Usuario, // Cria uma referência ao modelo Usuario
      key: 'id' // Define que a referência será à coluna 'id' do modelo Usuario
    },
    onUpdate: 'CASCADE', // Define que ao atualizar o id no modelo Usuario, as alterações serão cascatas
    onDelete: 'CASCADE', // Define que ao deletar o usuário, as entradas relacionadas serão deletadas em cascata
  },
  email: {
    type: Sequelize.STRING, 
    allowNull: false 
  },
  token: {
    type: Sequelize.STRING, 
    allowNull: false
  }
}, {
  tableName: 'esqueci_minha_senha', // Define o nome da tabela no banco de dados
  timestamps: true, // Ativa os timestamps createdAt e updatedAt
  hooks: {
    // Define um hook para alterar os timestamps antes de criar a entrada
    beforeCreate: (esqueciMinhaSenha) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas da data atual
      esqueciMinhaSenha.createdAt = threeHoursLater; // Define o createdAt como três horas antes da data atual
      esqueciMinhaSenha.updatedAt = threeHoursLater; // Define o updatedAt como três horas antes da data atual
    },
    
    beforeUpdate: (esqueciMinhaSenha) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); 
      esqueciMinhaSenha.updatedAt = threeHoursLater; 
    }
  }
});

Usuario.hasMany(EsqueciMinhaSenha, { foreignKey: 'usuarioId' }); // Um usuário pode ter várias entradas de EsqueciMinhaSenha
EsqueciMinhaSenha.belongsTo(Usuario, { foreignKey: 'usuarioId' }); // Cada entrada de EsqueciMinhaSenha pertence a um único usuário


module.exports = EsqueciMinhaSenha;

