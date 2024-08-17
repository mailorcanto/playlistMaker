// Importa o módulo Express
const express = require('express');

// Cria o objeto rotas
const router = express.Router();

// Importa o módulo usuarioController
const usuarioController = require('../controllers/usuarioController');

// Criar a rota criar usuário
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome do usuário
 *               email:
 *                 type: string
 *                 description: O email do usuário
 *               senha:
 *                 type: string
 *                 description: A senha do usuário
 *     responses:
 *       201:
 *         description: Usuário criado
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/usuarios', usuarioController.createusuario);

// Criar a rota buscar usuário por ID
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Buscar registro por ID
 */
router.get('/usuarios/:id', usuarioController.buscarId);

// Criar a rota buscar usuários que contêm o email
/**
 * @swagger
 * /usuarios/email/{email}:
 *   get:
 *     summary: Busca todos os usuários que contêm o email
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Busca todos os usuários que contêm o email
 */
router.get('/usuarios/email/:email', usuarioController.buscarUsuarioPorEmail);

// Criar a rota buscar todos os usuários
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/usuarios', usuarioController.getusuarios);

// Criar a rota para editar usuário
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put('/usuarios/:id', usuarioController.updateusuario);

// Criar a rota para deletar usuário
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deletar um usuário existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
router.delete('/usuarios/:id', usuarioController.deleteusuario);

// Criar a rota de login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário
 *               senha:
 *                 type: string
 *                 description: A senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Usuário não encontrado ou senha inválida
 *       500:
 *         description: Erro ao fazer login
 */
router.post('/login', usuarioController.login);

// Criar a rota de validação de token
/**
 * @swagger
 * /usuarios/validarToken:
 *   post:
 *     summary: Valida um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: O token JWT a ser validado
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Token não fornecido
 *       401:
 *         description: Token inválido
 */
router.post('/usuarios/validarToken', usuarioController.validarToken);

//cria a rota de esqueci minha senha
/**
 * @swagger
 * /esqueci-minha-senha:
 *   post:
 *     summary: Recuperar senha do usuário
 *     tags: [Recuperar senha]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário
 *     responses:
 *       200:
 *         description: Dados encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados não encontrados ou e-mail inválido
 *       500:
 *         description: Erro ao recuperar a senha
 */
router.post('/esqueci-minha-senha', usuarioController.esqueciMinhaSenha);

//cria a rota para resetar a senha
/**
 * @swagger
 * /resetarsenha:
 *   post:
 *     summary: Redefinir senha do usuário
 *     description: Redefine a senha do usuário usando um token de recuperação.
 *     tags:
 *       - Recuperar senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - senha
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperação de senha
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao resetar a senha
 */
router.post('/resetarsenha', usuarioController.resetarSenha);

//exporta as rotas criadas
module.exports = router;


