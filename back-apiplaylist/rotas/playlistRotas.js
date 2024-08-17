const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Rota POST para criar uma nova playlist
/**
 * @swagger
 * /playlists/criar:
 *   post:
 *     summary: Cria uma nova playlist
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da playlist
 *               genero:
 *                 type: string
 *                 description: Gênero da playlist
 *               imagem:
 *                 type: string
 *                 description: URL da imagem da playlist
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso
 *       500:
 *         description: Erro ao criar a playlist
 */
router.post('/criar', playlistController.criarPlaylist);

// Rota GET para listar todas as playlists, opcionalmente com músicas
/**
 * @swagger
 * /playlists/listar:
 *   get:
 *     summary: Lista todas as playlists
 *     tags: [Playlist]
 *     responses:
 *       200:
 *         description: Lista de playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   genero:
 *                     type: string
 *                   imagem:
 *                     type: string
 *       500:
 *         description: Erro ao listar playlists
 */
router.get('/listar', playlistController.listarPlaylists);

// Rota GET para exibir detalhes de uma playlist específica
/**
 * @swagger
 * /playlists/{id}/exibir:
 *   get:
 *     summary: Exibe os detalhes de uma playlist específica
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da playlist
 *     responses:
 *       200:
 *         description: Detalhes da playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 imagem:
 *                   type: string
 *                 musicas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       artista:
 *                         type: string
 *                       album:
 *                         type: string
 *                       genero:
 *                         type: string
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao exibir a playlist
 */
router.get('/:id/exibir', playlistController.exibirPlaylist);

// Rota GET para buscar playlist por nome
/**
 * @swagger
 * /playlists/nome/{nome}:
 *   get:
 *     summary: Busca playlists pelo nome
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da playlist
 *     responses:
 *       200:
 *         description: Playlists encontradas
 *       404:
 *         description: Nenhuma playlist encontrada com esse nome
 *       500:
 *         description: Erro ao buscar playlists
 */
router.get('/playlists/nome/:nome', playlistController.buscarNome);

// Rota DELETE para excluir uma playlist
/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     summary: Exclui uma playlist existente
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da playlist
 *     responses:
 *       204:
 *         description: Playlist excluída com sucesso
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao excluir a playlist
 */
router.delete('/:id', playlistController.excluirPlaylist);

// Rota GET para exportar uma playlist em formato .txt
/**
 * @swagger
 * /playlists/{id}/exportar:
 *   get:
 *     summary: Exporta uma playlist em formato .txt
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da playlist
 *     responses:
 *       200:
 *         description: Playlist exportada com sucesso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro ao exportar a playlist
 */
router.get('/:id/exportar', playlistController.exportarPlaylistTxt);

module.exports = router;





