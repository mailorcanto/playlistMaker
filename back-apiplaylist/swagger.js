const swaggerJsdoc = require('swagger-jsdoc'); // Importa o módulo para gerar documentação Swagger a partir de JSDoc
const swaggerUi = require('swagger-ui-express'); // Importa o módulo para servir a interface do Swagger UI

// Configurações para a documentação Swagger
const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'API Playlist Maker', // Título da API
      version: '1.0.0', // Versão da API
      description: 'API para gerenciar playlists', // Descrição da API
    },
    servers: [
      {
        url: 'http://localhost:3001/apiplaylist', // URL base para a API
      },
    ],
  },
  apis: ['./rotas/*.js'], // Caminho para os arquivos de rotas onde a documentação Swagger será gerada
};

const swaggerSpec = swaggerJsdoc(options); // Gera a especificação Swagger a partir das opções

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Configura o Swagger UI na rota /api-docs
};

module.exports = setupSwagger; 