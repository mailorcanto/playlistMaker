const Sequelize = require('sequelize'); 
const database = require('../data_base/db'); 
const Musica = require('./Musica'); 

const Playlist = database.define('Playlist', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  nome: {
    type: Sequelize.STRING, 
    allowNull: false, 
    unique: true
  },
  genero: {
    type: Sequelize.STRING, 
    allowNull: false 
  },
  imagem: {
    type: Sequelize.STRING, 
    allowNull: true 
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (playlist, options) => {
      // Ajusta os timestamps antes de criar a playlist
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtrai 3 horas do horário atual
      playlist.createdAt = threeHoursLater;
      playlist.updatedAt = threeHoursLater;
    },
    beforeUpdate: (playlist, options) => {
      const now = new Date();
      const threeHoursLater = new Date(now.getTime() - 3 * 60 * 60 * 1000); 
      playlist.updatedAt = threeHoursLater;
    }
  }
});

// Define a associação entre Playlist e Musica
Playlist.hasMany(Musica, { as: 'musicas', foreignKey: 'playlistId' }); // Uma playlist pode ter muitas músicas associadas
Musica.belongsTo(Playlist, { foreignKey: 'playlistId' }); // Cada música pertence a uma única playlist


module.exports = Playlist; 






