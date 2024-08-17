const express = require('express');
const router = express.Router();
const enviarMensagemController = require('../controllers/enviarMensagemController');

/**
 * @swagger
 * /api/enviaremail:
 *   post:
 *     summary: Enviar mensagem via E-mail
 *     tags: [Envio de mensagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destinatario:
 *                 type: string
 *                 description: Endereço de e-mail do destinatário
 *                 example: exemplo@dominio.com
 *               assunto:
 *                 type: string
 *                 description: Assunto do e-mail
 *                 example: "Redefinição de Senha"
 *               mensagem:
 *                 type: string
 *                 description: Conteúdo da mensagem do e-mail
 *                 example: "Clique no link a seguir para redefinir sua senha..."
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica se o e-mail foi enviado com sucesso
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Email enviado com sucesso"
 *       500:
 *         description: Erro ao enviar o e-mail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao enviar E-mail"
 */

router.post('/enviaremail', enviarMensagemController.enviarEmail);

module.exports = router;
