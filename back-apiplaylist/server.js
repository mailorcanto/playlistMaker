// Importa o módulo express
const express = require('express');

// Importa o módulo path para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Importa a instância do Sequelize configurada em db.js
const sequelize = require('./data_base/db');

// Importa o módulo cors para permitir solicitações de diferentes origens
const cors = require('cors');

// Importa as rotas
const uploadArquivoRotas = require('./rotas/uploadArquivoRotas');
const musicaRotas = require('./rotas/musicaRotas');
const playlistRotas = require('./rotas/playlistRotas');
const usuarioRotas = require('./rotas/usuarioRotas');
const validarToken = require('./rotas/tokenRotas');
const enviarMensagemRotas = require('./rotas/enviarMensagemRotas');

// Importa a configuração do Swagger
const setupSwagger = require('./swagger');

// Importa os modelos
require('./modelo/Playlist');
require('./modelo/Musica');
require('./modelo/Upload');
require('./modelo/Usuario');

// Carrega as variáveis de ambiente a partir de um arquivo .env
require('dotenv').config();

// Cria uma instância do express
const app = express();

// Define a porta do servidor a partir das variáveis de ambiente ou usa a porta 3001
const PORT = process.env.PORT || 3001;

// Configura o middleware CORS para permitir solicitações apenas da origem especificada
app.use(cors({
  origin: 'http://localhost:3000' // Ajuste conforme necessário para seu front-end
}));

// Configura o middleware para parsear de JSON para objeto Javascript
app.use(express.json());

// Configurar Swagger para documentação da API
setupSwagger(app);

// Disponibiliza os arquivos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Disponibiliza os arquivos da pasta 'playlists'
app.use('/playlists', express.static(path.join(__dirname, 'playlists')));

// Configura rotas
app.use('/apiplaylist/uploads', uploadArquivoRotas);
app.use('/apiplaylist/musicas', musicaRotas);
app.use('/apiplaylist/playlists', playlistRotas);
app.use('/apiplaylist', validarToken);
app.use('/apiplaylist', enviarMensagemRotas);
app.use('/apiplaylist',usuarioRotas) ;


// Middleware para tratar erros
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro no console
  res.status(500).send('Algo deu errado!');
});

// Sincroniza os modelos sem forçar recriação das tabelas
sequelize.sync().then(() => {
  // Inicia o servidor na porta especificada
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});













