const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musicaController');

// Rota para buscar música
/**
 * @swagger
 * /musicas/buscar:
 *   post:
 *     summary: Busca músicas
 *     tags: [Musica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da música a ser buscada
 *               artista:
 *                 type: string
 *                 description: Nome do artista
 *     responses:
 *       200:
 *         description: Lista de músicas encontradas
 *       500:
 *         description: Erro ao buscar músicas
 */
router.post('/buscar', musicaController.buscarMusica);

// Rota para adicionar música
/**
 * @swagger
 * /musicas/adicionar:
 *   post:
 *     summary: Adiciona uma nova música
 *     tags: [Musica]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da música
 *               artista:
 *                 type: string
 *                 description: Nome do artista
 *               album:
 *                 type: string
 *                 description: Nome do álbum
 *               genero:
 *                 type: string
 *                 description: Gênero da música
 *               playlistId:
 *                 type: integer
 *                 description: ID da playlist associada
 *     responses:
 *       201:
 *         description: Música adicionada com sucesso
 *       500:
 *         description: Erro ao adicionar música
 */
router.post('/adicionar', musicaController.adicionarMusica);

// Rota para excluir música
/**
 * @swagger
 * /musicas/{id}:
 *   delete:
 *     summary: Exclui uma música existente
 *     tags: [Musica]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da música a ser excluída
 *     responses:
 *       204:
 *         description: Música excluída com sucesso
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro ao excluir música
 */
router.delete('/:id', musicaController.excluirMusica);

module.exports = router;







