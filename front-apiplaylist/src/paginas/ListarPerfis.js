import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 
import Modal from '../componentes/Modal';
import Header from '../Header'; 
import Footer from '../Footer'; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import '../CSS/App.css'; 

function ListarPerfis() {
  const [usuarios, setUsuarios] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedId, setSelectedId] = useState(null); 
  const [mensagem, setMensagem] = useState(''); 

  // useEffect para buscar os usuários ao carregar a página
  useEffect(() => {
    axios.get('http://localhost:3001/apiplaylist/usuarios')
      .then(response => {
        setUsuarios(response.data); // Armazena os usuários no estado
        setLoading(false); 
      })
      .catch(error => {
        setError('Houve um problema ao buscar os usuários.'); // Define a mensagem de erro se a requisição falhar
        setLoading(false); 
      });
  }, []); // O array vazio [] indica que o efeito será executado apenas uma vez, após o componente ser montado

  // Função para abrir o modal de confirmação ao clicar em deletar
  const handleDelete = (id) => {
    setSelectedId(id); // Armazena o ID do usuário a ser deletado
    setShowModal(true); 
  };

  // Função para confirmar a exclusão do usuário
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/apiplaylist/usuarios/${selectedId}`); // Envia a requisição de exclusão ao backend
      setUsuarios(usuarios.filter(usuario => usuario.id !== selectedId)); // Remove o usuário da lista
      setMensagem('Usuário deletado com sucesso!');
      setShowModal(false); 
    } catch (error) {
      setError('Houve um problema ao deletar o usuário.'); // Define a mensagem de erro se a exclusão falhar
      setShowModal(false); // Fecha o modal de confirmação, mesmo em caso de erro
    }

    setTimeout(() => {
      setMensagem(''); // Limpa a mensagem de sucesso após 3 segundos
    }, 3000);
  };

  // Função para fechar o modal sem excluir
  const closeModal = () => {
    setShowModal(false); // Fecha o modal de confirmação
    setSelectedId(null); // Reseta o ID do usuário selecionado
  };

  // Mensagem de carregamento
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
        <div className="lista-playlists">
          <h2>Lista de Perfis</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeia os usuários e cria uma linha na tabela para cada um */}
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td className="action-column">
                    <Link to={`/editar-perfil/${usuario.id}`} className="espaco_coluna">
                      <FaEdit /> Editar 
                    </Link>
                    <Link onClick={() => handleDelete(usuario.id)}>
                      <FaTrash /> Deletar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p></p>
          {mensagem && <p>{mensagem}</p>} 
          <BotaoVoltar className="btn-voltar" /> 
        </div>
        
          <Modal
            show={showModal} 
            handleClose={closeModal} 
            handleConfirm={confirmDelete} 
            title="Confirmar Exclusão" // Título do modal
          >
            Tem certeza de que deseja deletar este usuário? 
          </Modal>
      </div>
      <Footer className="App-footer" /> 
    </div>
  );
}

export default ListarPerfis; 




