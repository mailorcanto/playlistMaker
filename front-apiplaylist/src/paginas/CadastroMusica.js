import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import BotaoVoltar from '../componentes/BotaoVoltar';
import ModalOk from '../componentes/ModalOk'; 
import Header from '../Header'; 
import Footer from '../Footer'; 

function CadastroMusica() {
  // Estado para armazenar os valores dos campos do formulário
  const [campos, setCampos] = useState({
    nome: '',
    artista: '',
    album: '',
    genero: '',
    imagemAlbum: '',
    playlistId: '',
    previewUrl: ''
  });

  const [error, setError] = useState(''); 
  const [playlists, setPlaylists] = useState([]);
  const [opcoesAlbuns, setOpcoesAlbuns] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [modalTitle, setModalTitle] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 

  // useEffect para buscar as playlists ao carregar a página
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/apiplaylist/playlists/listar');
        setPlaylists(response.data); // Armazena as playlists no estado
      } catch (error) {
        console.error('Erro ao buscar playlists:', error); 
      }
    };
    fetchPlaylists(); // Chama a função para buscar playlists
  }, []); 

  // Função para atualizar o estado dos campos conforme o usuário digita
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value // Atualiza o valor do campo correspondente
    }));
  };

  // Função para buscar música/artista após os dois campos terem sido preenchidos
  const handleBlur = async () => {
    if (campos.nome && campos.artista) {
      try {
        const response = await axios.post('http://localhost:3001/apiplaylist/musicas/buscar', {
          nome: campos.nome,
          artista: campos.artista
        });

        const musicas = response.data.musicas;
        setOpcoesAlbuns(musicas); // Armazena as diferentes opções de álbuns retornadas pela API

        // Se houver opções de álbuns, seleciona automaticamente o primeiro
        if (musicas.length > 0) {
          const primeiraOpcao = musicas[0];
          setCampos((prevCampos) => ({
            ...prevCampos,
            album: primeiraOpcao.album,
            genero: primeiraOpcao.genero,
            imagemAlbum: primeiraOpcao.imagemAlbum,
            previewUrl: primeiraOpcao.previewUrl
          }));
        }

        setError(''); // Limpa qualquer mensagem de erro
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message); // Define mensagem de erro específica retornada pela API
        } else {
          console.error('Erro ao buscar música:', error);
          setError('Erro ao buscar música.'); 
        }
      }
    }
  };

  // Função para atualizar os campos conforme a seleção do usuário na lista de álbuns
  const handleAlbumChange = (event) => {
    const index = event.target.value;
    const albumSelecionado = opcoesAlbuns[index];

    setCampos((prevCampos) => ({
      ...prevCampos,
      album: albumSelecionado.album,
      genero: albumSelecionado.genero,
      imagemAlbum: albumSelecionado.imagemAlbum,
      previewUrl: albumSelecionado.previewUrl
    }));
  };

  // Função para tratar o envio do formulário
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    try {
      await axios.post('http://localhost:3001/apiplaylist/musicas/adicionar', campos); // Envia os dados do formulário para o backend
      setCampos({ // Limpa os campos do formulário após o envio
        nome: '',
        artista: '',
        album: '',
        genero: '',
        imagemAlbum: '',
        playlistId: '',
        previewUrl: ''
      }); 
      setOpcoesAlbuns([]); // Limpa as opções de álbuns após o cadastro
      setModalTitle('Sucesso'); // Define o título do modal
      setModalMessage('Música adicionada com sucesso!'); // Define a mensagem do modal
      setShowModal(true); // Exibe o modal de sucesso
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Define mensagem de erro específica retornada pela API
      } else {
        console.error('Erro ao cadastrar música:', error); 
        setError('Erro ao cadastrar música.'); 
      }
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Header title="Playlist Maker" />
      <p></p>
      <div className="form-container">
        <h2>Cadastrar Música</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>
              Nome da Música:
              <input
                type="text"
                name="nome"
                value={campos.nome}
                onChange={handleInputChange}
                onBlur={handleBlur} /* Busca as opções de música ao sair do campo */
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Nome do Artista:
              <input
                type="text"
                name="artista"
                value={campos.artista}
                onChange={handleInputChange}
                onBlur={handleBlur} /* Busca as opções de música ao sair do campo */
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Playlist:
              <select name="playlistId" value={campos.playlistId} onChange={handleInputChange} required>
                <option value="">Selecione uma playlist</option>
                {playlists.map((playlist) => (<option key={playlist.id} value={playlist.id}>{playlist.nome}</option>))}
              </select>
            </label>
          </div>
          {/* Se houver opções de álbuns, exibe a lista para seleção */}
          {opcoesAlbuns.length > 0 && (
            <div className="form-group">
              <label>
                Selecione o Álbum:
                <select onChange={handleAlbumChange}>
                  {opcoesAlbuns.map((opcao, index) => (
                    <option key={index} value={index}>
                      {opcao.album} - {opcao.artista}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <div className="form-group">
            <label>
              Gênero:
              <input type="text" name="genero" value={campos.genero} readOnly />
            </label>
          </div>
          {/* Exibe a capa do álbum, se disponível */}
          {campos.imagemAlbum && (
            <div className="form-group">
              <label>Capa do Álbum:</label>
              <img src={campos.imagemAlbum} alt="Imagem do Álbum" width="100" height="100" />
            </div>
          )}
          <button type="submit" className="btn-cadastrar">Cadastrar</button>
          {error && <p className="error">{error}</p>} {/* Exibe mensagens de erro, se houver */}
        </form>
        <hr className="hr2" />
        <BotaoVoltar /> 
      </div>
      
      <p></p>
      <ModalOk
        show={showModal}
        handleClose={closeModal}
        title={modalTitle}
      >
        {modalMessage}
      </ModalOk>
      <Footer /> 
    </div>
  );
}

export default CadastroMusica; 
















