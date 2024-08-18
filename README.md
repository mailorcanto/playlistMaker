# Playlist Maker (Projeto desenvolvido para o curso de Práticas Avançadas em Desenvolvimento Web - 3 Mil Talentos/SENAC-RS)

O **Playlist Maker** é uma aplicação web que permite criar, gerenciar e compartilhar playlists de música. Este projeto é composto por front-end em React e back-end em Node.js com Express, utilizando Sequelize como ORM para banco de dados.

## Funcionalidades
- **Autenticação de Usuário**: Login, Cadastro, Recuperação de Senha.
- **Gerenciamento de Playlists**: Criação, Edição, Exclusão de playlists e músicas.
- **Upload de Arquivos**: Envio de imagens e prévias de músicas.
- **Exportação de Playlists**: Playlists salvas em formato .txt (em back-apiplaylist/playlists), que podem ser convertidas através de aplicações como o MusConv e importadas para os principais serviços de streaming de música

## Requisitos
- **node.js**
- **npm** 
- **Mysql** (ou outro banco de dados compatível com Sequelize)


## INSTALAÇÃO BACK-END
1. **Acesse a pasta back-apiplaylist e instale as dependências**:
npm install

2. **Crie e configure .env conforme exemplo**:

PORT=3001

CONNECTION_STRING=mysql://root:root@localhost:3306/apiplaylists

JWT_KEY=secret_gerado_por_voce

USER_EMAIL=seu_email@gmail.com

PWD_EMAIL_GMAIL=sua_senha_de_aplicativo

PWD_EMAIL_GMAIL_APP=sua_senha_de_aplicativo_gerada

CLIENT_ID_GMAIL=seu_cliente_id

SECRET_ID_GMAIL=seu_cliente_secret

3. **Na pasta geradorSecret, digite 'node gerarChavesJWT' para gerar secret e substitua na linha JWT_KEY do arquivo .env.**

4. **Para configurar o envio de e-mail para redefinição de senha, você precisará de um endereço de e-mail Gmail, uma senha de aplicativo (PWD_EMAIL_GMAIL_APP, gerada nas configurações de segurança do Gmail), e as credenciais OAuth2 (Client ID e Client Secret) obtidas no Google Cloud Console. Substitua as informações no arquivo .env conforme necessário.**

5. **Crie o banco de dados mysql do projeto**: 
CREATE DATABASE apiplaylists;

6. **Inicie o servidor back-end**: 
npm start


## INSTALAÇÃO FRONT-END
1. **Acesse a pasta front-apiplaylist e instale as dependências**:
npm install

2. **Inicie o servidor front-end**:
npm start
