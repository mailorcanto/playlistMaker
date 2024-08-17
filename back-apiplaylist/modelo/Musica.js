const Sequelize = require('sequelize'); 
const database = require('../data_base/db'); 

const Musica = database.define('Musica', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  nome: {
    type: Sequelize.STRING, 
    allowNull: false 
  },
  artista: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  album: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  genero: {
    type: Sequelize.STRING, 
    allowNull: true 
  },
  imagemAlbum: {
    type: Sequelize.STRING, 
    allowNull: true 
  },
  previewUrl: {
    type: Sequelize.STRING, 
    allowNull: true 
  },
  playlistId: {
    type: Sequelize.INTEGER, 
    allowNull: false 
  }
}, {
  timestamps: true, // Habilita os campos createdAt e updatedAt automaticamente
  hooks: {
    beforeCreate: (musica, options) => {
      // Ajusta os timestamps antes de criar a música
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas do horário atual
      musica.createdAt = threeHoursLater;
      musica.updatedAt = threeHoursLater;
    },
    beforeUpdate: (musica, options) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); 
      musica.updatedAt = threeHoursLater;
    }
  }
});

module.exports = Musica; 











