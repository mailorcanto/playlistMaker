const axios = require('axios'); // Importa o módulo axios para lidar com requisições HTTP
const Musica = require('../modelo/Musica'); // Importa o modelo Musica

// Função para buscar informações sobre uma música na API do iTunes
exports.buscarMusica = async (req, res) => {
  try {
    const { nome, artista } = req.body; // Extrai o nome da música e o nome do artista do corpo da requisição

    // Verifica se o nome da música e o nome do artista foram fornecidos
    if (!nome || !artista) {
      return res.status(400).json({ message: 'Nome e artista são obrigatórios' }); // Retorna erro se um dos campos não for informado
    }

    // Faz requisição GET para a API do iTunes com os parâmetros de busca
    const iTunesResponse = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: `${nome} ${artista}`, // Nome de música e artista como parâmetros de busca
        media: 'music', // Especifica que está buscando música
        entity: 'musicTrack', // Especifica que está buscando por uma faixa musical
        limit: 10 // Limita o número de resultados a 10
      }
    });

    // Mapeia os resultados retornados da API
    const results = iTunesResponse.data.results.map(result => ({
      nome: result.trackName, // Nome da música
      artista: result.artistName, // Nome do artista
      album: result.collectionName, // Nome do álbum
      imagemAlbum: result.artworkUrl100.replace('100x100', '300x300'), // URL da imagem do álbum, redimensioada de 100x100 para 300x300
      previewUrl: result.previewUrl, // URL com prévia da música
      genero: result.primaryGenreName // Gênero da música
    }));

    // Verifica se busca retornou resultdo
    if (results.length > 0) {
      // Exibir resultados na tela após busca
      return res.status(200).json({ 
        musicas: results, // Retorna todos os resultados encontrados
        album: results[0].album, // Preenche o álbum do primeiro resultado
        genero: results[0].genero, // Preenche o gênero do primeiro resultado
        imagemAlbum: results[0].imagemAlbum, // Preenche a imagem do álbum do primeiro resultado
        previewUrl: results[0].previewUrl // Preenche a URL de prévia do primeiro resultado
      });
    } else {
      // Erro para música não encontrada
      return res.status(404).json({ message: 'Nenhuma música encontrada' });
    }
  } catch (error) {
    // Log e erro de comunicação com a API
    console.error('Erro ao buscar música:', error);
    res.status(500).json({ message: 'Erro ao buscar música', error });
  }
};

// Função para adicionar música ao banco de dados
exports.adicionarMusica = async (req, res) => {
  try {
    const { nome, artista, album, genero, playlistId, imagemAlbum, previewUrl } = req.body; // Extrai os dados da música do corpo da requisição

    // Verifica se iD de playlist foi informado
    if (!playlistId) {
      return res.status(400).json({ message: 'Playlist ID é obrigatório' }); // ERRO de playlist não informada
    }

    // Cria nova música no banco de dados com os dados fornecidos
    const novaMusica = await Musica.create({ 
      nome, 
      artista, 
      album, 
      genero, 
      playlistId, 
      imagemAlbum, 
      previewUrl 
    });

    // Sucesso
    res.status(201).json(novaMusica);
  } catch (error) {
    // Erro
    console.error('Erro ao adicionar música:', error);
    res.status(500).json({ message: 'Erro ao adicionar música', error });
  }
};

// Função para excluir música
exports.excluirMusica = async (req, res) => {
  try {
    const { id } = req.params; // Pega ID da música dos parâmetros da URL

    // Busca a música no banco pelo ID fornecido
    const musica = await Musica.findByPk(id);

    // Erro para música não encontrada
    if (!musica) {
      return res.status(404).json({ message: 'Música não encontrada' }); 
    }
    
    // Exclui a música do banco de dados
    await musica.destroy();
    
    // Sucesso
    res.status(200).json({ message: 'Música excluída com sucesso' });
  } catch (error) {
    // Erro
    console.error('Erro ao excluir música:', error);
    res.status(500).json({ message: 'Erro ao excluir música', error });
  }
};



















