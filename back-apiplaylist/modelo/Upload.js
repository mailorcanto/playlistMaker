const Sequelize = require('sequelize'); 
const database = require('../data_base/db'); 

const Upload = database.define('upload', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  nomeArquivo: {
    type: Sequelize.STRING, 
    allowNull: false 
  },
  dados: {
    type: Sequelize.BLOB('long'), // Define o tipo de dado como LONGBLOB
    allowNull: false 
  }
}, {

  timestamps: true, // Habilita os campos createdAt e updatedAt automaticamente
  hooks: {
    beforeCreate: (upload, options) => {
      // Ajusta os timestamps antes de criar o upload
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas do horário atual
      upload.createdAt = threeHoursLater;
      upload.updatedAt = threeHoursLater;
    },
    beforeUpdate: (upload, options) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); 
      upload.updatedAt = threeHoursLater;
    }
  }
});

module.exports = Upload; 

