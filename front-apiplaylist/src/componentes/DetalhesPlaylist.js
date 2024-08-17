import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 
import { useParams } from 'react-router-dom'; // Importa useParams para acessar parâmetros da URL
import Modal from '../componentes/Modal'; 
import ModalOk from '../componentes/ModalOk'; 
import Header from '../Header'; 
import Footer from '../Footer'; 
import { FaPlay, FaStop } from 'react-icons/fa'; // Importa ícones de play e stop da biblioteca react-icons

function DetalhesPlaylist() {
  // Obtém o ID da playlist a partir dos parâmetros da URL
  const { id } = useParams();


  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModalOk, setShowModalOk] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [musicaIdToDelete, setMusicaIdToDelete] = useState(null);

  // Efeito para buscar os detalhes da playlist ao carregar o componente
  useEffect(() => {
    axios.get(`http://localhost:3001/apiplaylist/playlists/${id}/exibir`)
      .then(response => {
        setPlaylist(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os detalhes da playlist.');
        setLoading(false);
      });
  }, [id]);

  // Efeito para pausar o áudio quando o componente é desmontado (ex: sair da página)
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause(); // Pausa o áudio se ele estiver tocando
        audio.currentTime = 0; // Reseta o áudio
      }
    };
  }, [audio]);

  // Função para solicitar a exclusão de uma música
  const handleDeleteRequest = (musicaId) => {
    setMusicaIdToDelete(musicaId);
    setModalTitle('Confirmar Exclusão');
    setModalMessage('Tem certeza que deseja excluir esta música?');
    setShowModal(true);
  };

  // Função para confirmar a exclusão de uma música
  const handleConfirmDelete = async () => {
    try {
      // Verificar se música excluída está tocando prévia e interrompê-la
      if (currentPlayingId === musicaIdToDelete && audio) {
        audio.pause();
        audio.currentTime = 0;
        setCurrentPlayingId(null);
        setAudio(null);
      }

      await axios.delete(`http://localhost:3001/apiplaylist/musicas/${musicaIdToDelete}`);
      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        musicas: prevPlaylist.musicas.filter(musica => musica.id !== musicaIdToDelete)
      }));
      setShowModal(false);
    } catch (error) {
      setError('Houve um problema ao excluir a música.');
    }
  };

  // Função para fechar o modal de confirmação de exclusão
  const closeModal = () => {
    setShowModal(false);
    setMusicaIdToDelete(null);
  };

  // Função para alternar entre reproduzir e parar uma música
  const handlePlayStop = (musicaId, previewUrl) => {
    // Verifica se existe áudio sendo reproduzido e se é a mesma música
    if (audio && currentPlayingId === musicaId) {
       // Pausa o áudio atual
      audio.pause();
      // Volta o áudio para o começo (função de pare)
      audio.currentTime = 0;
      // null para id de música sendo reproduzida (não há música sendo reproduzida)
      setCurrentPlayingId(null);
      // null para audio sendo reproduzido (não há música sendo reproduzida)
      setAudio(null);
    } else { // Se algum áudio estiver tocando e o usuário clicar play em outra música
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setCurrentPlayingId(musicaId);

      newAudio.onended = () => {
        setCurrentPlayingId(null);
        setAudio(null);
      };
    }
  };

  // Função para exportar a playlist em um arquivo .txt
  const handleExportar = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/apiplaylist/playlists/${id}/exportar`);
      const link = document.createElement('a');
      link.href = response.data.filePath;
      link.download = response.data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setModalTitle('Sucesso');
      setModalMessage('Playlist exportada com sucesso!');
      setShowModalOk(true);
    } catch (error) {
      setModalTitle('Erro');
      setModalMessage('Erro ao exportar a playlist.');
      setShowModalOk(true);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <Header title="Playlist Maker" />
      <div className="App-content">
        <p></p>
        <div className="detalhes-playlist">
          {playlist ? (
            <div>
              <p><strong>ID:</strong> {playlist.id}</p>
              <p><strong>Nome:</strong> {playlist.nome}</p>
              <p><strong>Gênero:</strong> {playlist.genero}</p>
              {playlist.imagem && (
                <div>
                  <img src={playlist.imagem} alt="Imagem da Playlist" width="150" height="150" />
                </div>
              )}
              {playlist.musicas && playlist.musicas.length > 0 ? (
                <ul className="musicas-lista">
                  {playlist.musicas.map((musica, index) => (
                    <li key={musica.id} className="musica-item">
                      <div className="lista-numeros">
                        {index + 1}. {/* Número ao lado da música */}
                      </div>
                      {musica.imagemAlbum && (
                        <img src={musica.imagemAlbum} alt="Capa do Álbum" width="60" height="60" className="musica-capa" />
                      )}
                      {musica.previewUrl && (
                        <button onClick={() => handlePlayStop(musica.id, musica.previewUrl)} className="btn-play-stop">
                          {currentPlayingId === musica.id ? <FaStop /> : <FaPlay />}
                        </button>
                      )}
                      <div className="musica-dados">
                        <p><strong>Nome:</strong> {musica.nome}</p>
                        <p><strong>Artista:</strong> {musica.artista}</p>
                        <p><strong>Álbum:</strong> {musica.album}</p>
                        <p><strong>Gênero:</strong> {musica.genero}</p>
                      </div>
                      <div className="btn-excluir-container">
                        <button onClick={() => handleDeleteRequest(musica.id)} className="btn-excluir">Excluir</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Não há músicas nesta playlist.</p>
              )}
            </div>
          ) : (
            <p>Playlist não encontrada.</p>
          )}
          <button onClick={handleExportar} className="btn-criar">Exportar</button>
          <hr className="hr3" />
          <BotaoVoltar className="btn-voltar" />
          {/* Modal para confirmação de exclusão de música */}
          <Modal
            show={showModal}
            handleClose={closeModal}
            handleConfirm={handleConfirmDelete}
            title={modalTitle}
          >
            {modalMessage}
          </Modal>
          {/* Modal para exibir mensagens de sucesso ou erro */}
          <ModalOk
            show={showModalOk}
            handleClose={() => setShowModalOk(false)}
            title={modalTitle}
          >
            {modalMessage}
          </ModalOk>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetalhesPlaylist;
































