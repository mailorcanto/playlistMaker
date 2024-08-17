const Playlist = require('../modelo/Playlist'); //Importa modelo Playlist
const Musica = require('../modelo/Musica'); // Importa modelo Musica
const fs = require('fs'); // Importa módulo fs para lidar com arquivos
const path = require('path'); // Importa módulo path para lidar com caminhos
const { Op } = require('sequelize'); // Importa operadores do Sequelize

// Função para criar nova playlist
exports.criarPlaylist = async (req, res) => {
  try {
    const { nome, genero, imagem } = req.body;

    // Verificar se já existe uma playlist com o mesmo nome
    const playlistExistente = await Playlist.findOne({ where: { nome } });
    if (playlistExistente) {
      return res.status(400).json({ message: 'Uma playlist com esse nome já existe' });
    }

    // Cria nova playlist conforme os parâmetros (se nome for único)
    const novaPlaylist = await Playlist.create({ nome, genero, imagem });

    // Sucesso
    res.status(201).json(novaPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar playlist', error: error.message });
  }
};

// Função para listar todas as playlists sem detalhes de músicas (página Listar Playlists)
exports.listarPlaylists = async (req, res) => {
  try {
    // Exibindo dados de playlist
    const playlists = await Playlist.findAll({
      attributes: ['id', 'nome', 'genero', 'imagem'] // Atributos de playlist
    });
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar playlists', error: error.message });
  }
};

// Função para exibir detalhes de uma playlist
exports.exibirPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id, {
      include: [{
        model: Musica,
        as: 'musicas'
      }]
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao exibir a playlist', error: error.message });
  }
};

// Função para buscar playlists por nome
exports.buscarNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const playlists = await Playlist.findAll({
      where: { 
        nome: { [Op.like]: `%${nome}%` } 
      } 
    });

    if (playlists.length > 0) {
      res.status(200).json(playlists);
    } else {
      res.status(404).json({ error: 'Nenhuma playlist encontrada com esse nome' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar playlists por nome' });
  }
};

// Função para excluir uma playlist
exports.excluirPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    await Playlist.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir playlist', error: error.message });
  }
};

// Função para exportar uma playlist para um arquivo txt
exports.exportarPlaylistTxt = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca playlist pelo ID (e músicas correspondentes)
    const playlist = await Playlist.findByPk(id, {
      include: [{
        model: Musica,
        as: 'musicas'
      }]
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    // Criar o arquivo txt com a ordem correta de leitura pelo 'MusConv' (musica, artista, album)
    let txtContent = '';
    playlist.musicas.forEach(musica => {
      txtContent += `${musica.nome} - ${musica.artista} - ${musica.album}\n`;
    });

    // Caminho para salvar o arquivo .txt na pasta 'playlists' na raiz do projeto
    const playlistsDir = path.join(__dirname, '..', 'playlists');

    // Verifica se a pasta 'playlists' existe ou cria a pasta 'playlists' na pasta raíz do projeto
    if (!fs.existsSync(playlistsDir)) {
      fs.mkdirSync(playlistsDir);
    }

    const filePath = path.join(playlistsDir, `playlist_${playlist.id}.txt`);

    // Salva o conteúdo em um arquivo .txt
    fs.writeFile(filePath, txtContent, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao exportar playlist', error: err.message });
      }

      // Envia o caminho do arquivo como res p/ download
      res.status(200).json({ filePath, fileName: `playlist_${playlist.id}.txt` });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao exportar playlist', error: error.message });
  }
};










