import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 
import Modal from '../componentes/Modal'; 
import Header from '../Header'; 
import Footer from '../Footer'; 

// Importa ícones do react-icons para uso na interface
import { FaEye, FaTrash } from 'react-icons/fa'; 

function ListaPlaylists() {
  const [playlists, setPlaylists] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedId, setSelectedId] = useState(null); 
  const [mensagem, setMensagem] = useState(''); 

  // useEffect para buscar as playlists ao carregar a página
  useEffect(() => {
    axios.get('http://localhost:3001/apiplaylist/playlists/listar')
      .then(response => {
        setPlaylists(response.data); // Armazena as playlists no estado
        setLoading(false); // Define o estado de carregamento como falso
      })
      .catch(error => {
        setError('Houve um problema ao buscar as playlists.'); // Define a mensagem de erro se a requisição falhar
        setLoading(false); 
      });
  }, []); 

  // Função para abrir o modal de confirmação ao clicar em excluir
  const handleDelete = (id) => {
    setSelectedId(id); // Armazena o ID da playlist a ser deletada
    setShowModal(true); // Exibe o modal de confirmação
  };

  // Função para confirmar a exclusão da playlist
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/apiplaylist/playlists/${selectedId}`); // Envia a requisição de exclusão ao backend
      setPlaylists(playlists.filter(playlist => playlist.id !== selectedId)); // Remove a playlist da lista
      setMensagem('Playlist deletada com sucesso!'); // Exibe mensagem de sucesso
      setShowModal(false); // Fecha o modal de confirmação
    } catch (error) {
      setError('Houve um problema ao deletar a playlist.'); // Define a mensagem de erro se a exclusão falhar
      setShowModal(false); // Fecha o modal de confirmação, mesmo em caso de erro
    }

    setTimeout(() => {
      setMensagem(''); // Limpa a mensagem de sucesso após 3 segundos
    }, 3000);
  };

  // Função para fechar o modal sem excluir
  const closeModal = () => {
    setShowModal(false); // Fecha o modal de confirmação
    setSelectedId(null); // Reseta o ID da playlist selecionada
  };

  // Se a página estiver carregando, exibe uma mensagem de carregamento
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Se houver um erro, exibe a mensagem de erro
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <Header title="Playlist Maker" /> 
      <div className="App-content">
        <p></p>
        <div className="lista-playlists">
          <h2>Lista de Playlists</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeia as playlists e cria uma linha na tabela para cada uma */}
              {playlists.map(playlist => (
                <tr key={playlist.id}>
                  <td>{playlist.id}</td>
                  <td>{playlist.nome}</td>
                  <td>{playlist.genero}</td>
                  <td>
                    {playlist.imagem && (
                      <img src={playlist.imagem} alt="Imagem da Playlist" width="70" height="70" /> // Exibe a imagem da playlist, se disponível
                    )}
                  </td>
                  <td className="action-column">
                    <Link to={`/playlist/${playlist.id}`} className="espaco_coluna">
                      <FaEye /> Exibir
                    </Link>
                    <Link onClick={() => handleDelete(playlist.id)}>
                      <FaTrash /> Excluir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mensagem && <p>{mensagem}</p>} 
          <p></p>
          <BotaoVoltar className="btn-voltar" /> 
          <Modal
            show={showModal}
            handleClose={closeModal}
            handleConfirm={confirmDelete}
            title="Confirmar Exclusão"
          >
            Tem certeza de que deseja deletar esta playlist?
          </Modal>
        </div>
      </div>
      <Footer className="footer" /> 
    </div>
  );
}

export default ListaPlaylists; 










