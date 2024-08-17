import React, { useState, useRef } from 'react'; 
import axios from 'axios'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 
import ModalOk from '../componentes/ModalOk'; 
import Header from '../Header'; 
import Footer from '../Footer'; 

function CriarPlaylist() {
  // Estado para armazenar os valores dos campos do formulário
  const [campos, setCampos] = useState({
    nome: '',
    genero: '',
    imagem: ''
  });

  const [imagemArquivo, setImagemArquivo] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [modalTitle, setModalTitle] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 
  const imagemInputRef = useRef(null); // Referência para o input de upload de imagem

  // Função para atualizar o estado dos campos conforme o usuário digita
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value // Atualiza o campo correspondente no estado 'campos'
    }));
  };

  // Função para capturar o arquivo de imagem selecionado pelo usuário
  const handleImagemChange = (event) => {
    setImagemArquivo(event.target.files[0]); // Armazena o arquivo de imagem no estado
  };

  // Função para tratar o envio do formulário
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    try {
      let imagemUrl = campos.imagem;
      // Se um arquivo de imagem foi selecionado, faz o upload da imagem
      if (imagemArquivo) {
        const formData = new FormData(); // Cria um objeto FormData para enviar o arquivo
        formData.append('image', imagemArquivo); // Adiciona o arquivo de imagem ao FormData
        const uploadResponse = await axios.post('http://localhost:3001/apiplaylist/uploads/uploadarquivo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imagemUrl = uploadResponse.data.url; // Armazena a URL da imagem retornada pelo servidor
      }
      // Envia os dados da nova playlist para o backend
      await axios.post('http://localhost:3001/apiplaylist/playlists/criar', {
        nome: campos.nome,
        genero: campos.genero,
        imagem: imagemUrl
      });

      // Exibe mensagem de sucesso no modal
      setModalTitle('Sucesso');
      setModalMessage('Playlist criada com sucesso!');
      setShowModal(true);

      // Limpa os campos do formulário após o envio
      setCampos({
        nome: '',
        genero: '',
        imagem: ''
      });
      setImagemArquivo(null); // Limpa o estado do arquivo de imagem
      if (imagemInputRef.current) {
        imagemInputRef.current.value = ''; // Limpa o input de upload de imagem
      }
    } catch (error) {
      console.error('Erro ao criar playlist:', error); // Exibe erro no console se houver falha na requisição
      // Exibe uma mensagem de erro no modal
      setModalTitle('Erro');
      setModalMessage('Já existe playlist com o nome informado');
      setShowModal(true);
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Header title="Playlist Maker" /> 
      <div className="App-content">
        <div className="form-container">
          <h2>Criar Playlist</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={campos.nome}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Gênero:
                <input
                  type="text"
                  name="genero"
                  value={campos.genero}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Upload de Imagem:
                <input
                  type="file"
                  className="upload-file"
                  onChange={handleImagemChange}
                  ref={imagemInputRef} // Referência para o input de upload de imagem
                />
              </label>
            </div>
            <button type="submit" className="btn-criar">Criar</button> 
            <hr className="hr1" />
            <BotaoVoltar className="btn-voltar" /> 
          </form>

          <ModalOk
            show={showModal} 
            handleClose={closeModal} 
            title={modalTitle} 
          >
            {modalMessage} 
          </ModalOk>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default CriarPlaylist; 












