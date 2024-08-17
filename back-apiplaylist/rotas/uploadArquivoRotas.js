// Importa o módulo express
const express = require('express');

// Cria um objeto de roteamento usando o express
const router = express.Router();

// Importa o controlador de upload de arquivos
const uploadController = require('../controllers/uploadArquivosController');

// Importa a configuração do multer para upload de arquivos
const upload = require('../Multer/multer');

// Rota para upload de arquivo
/**
 * @swagger
 * /upload/uploadarquivo:
 *   post:
 *     summary: Faz o upload de um arquivo
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: O arquivo de imagem a ser enviado
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
 *       500:
 *         description: Erro ao enviar o arquivo
 */
router.post('/uploadarquivo', upload.single('image'), uploadController.uploadarquivo);

// Rota para buscar arquivo pelo ID
/**
 * @swagger
 * /upload/arquivo/{id}:
 *   get:
 *     summary: Busca um arquivo pelo ID
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do arquivo a ser buscado
 *     responses:
 *       200:
 *         description: Retorna o arquivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nomeArquivo:
 *                   type: string
 *                 dados:
 *                   type: string
 *                   format: base64
 *                   description: Dados do arquivo em base64
 *       404:
 *         description: Arquivo não encontrado
 *       500:
 *         description: Erro ao buscar o arquivo
 */
router.get('/arquivo/:id', uploadController.getArquivo);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;



