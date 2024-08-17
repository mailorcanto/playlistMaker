const fs = require('fs').promises; // Importa o módulo 'fs' com suporte a promessas para operações de sistema de arquivos
const Upload = require('../modelo/Upload'); // Importa modelo Upload

// Salvar o upload de arquivo
exports.uploadarquivo = async (req, res) => {

  // Lendo o arquivo temporário
  const diretorioArquivo = req.file.path;
  const nomeArquivo = req.file.filename;

  try {
    const dados = await fs.readFile(diretorioArquivo); // Lê o conteúdo do arquivo temporário
    //console.log('uploadarquivo.Conteudo do Arquivo:' + dados); // Log para depuração (comentado para não poluir terminal)

    // Se dados não for null
    if (!dados) {
      throw new Error('dados é null');
    }

    // Cria novo registro de upload no banco de dados
    const novoUpload = await Upload.create({ nomeArquivo, dados });
    const imagemUrl = `http://localhost:3001/apiplaylist/uploads/arquivo/${novoUpload.id}`;
    res.status(201).json({ message: 'Upload realizado com sucesso', url: imagemUrl });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao efetuar upload', nomeArquivo });
  } finally {
    // Apaga o arquivo temporario
    await fs.unlink(diretorioArquivo);
  }
};

// Buscar os arquivos do banco
exports.getArquivo = async (req, res) => {
  try {
    const id = req.params.id; // Obtém o ID do arquivo dos parâmetros da requisição
    const upload = await Upload.findByPk(id); // Busca o arquivo no banco de dados pelo ID

    if (!upload) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    console.log('Nome do arquivo:', upload.nomeArquivo); 
    console.log('Tamanho do arquivo encontrado:' + upload.dados.byteLength); 
    console.log('Conteúdo do arquivo:', upload.dados); 

    // Definindo o tipo de conteúdo com base na extensão do arquivo
    let contentType;
    if (upload.nomeArquivo.endsWith('.jpg') || upload.nomeArquivo.endsWith('.jpeg')) {
      console.log('image/jpeg');
      contentType = 'image/jpeg';
    } else if (upload.nomeArquivo.endsWith('.png')) {
      console.log('image/png');
      contentType = 'image/png';
    } else if (upload.nomeArquivo.endsWith('.mp3')) {
      console.log('audio/mpeg');
      contentType = 'audio/mpeg';
    } else {
      console.log('application/octet-stream');
      contentType = 'application/octet-stream'; // Tipo de conteúdo genérico
    }

    res.set('Content-Type', contentType); // Define o tipo de conteúdo da resposta
    res.set('Content-Disposition', `inline; filename="${upload.nomeArquivo}"`); // Define o nome do arquivo na resposta
    res.status(200).end(upload.dados); // Envia os dados binários diretamente

  } catch (err) {
    console.log("Erro ao buscar o arquivo: " + err); // Log de erro
    res.status(500).json({ error: 'Erro ao buscar o arquivo' });
  }
};





