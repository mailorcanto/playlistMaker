import React, { useState, useEffect } from 'react'; 
import axiosInstance from '../axios/configuracaoAxios'; 
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Header'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 

function EditarPerfil() {
  const { id } = useParams(); // Hook para acessar o parâmetro 'id' da URL
  const navigate = useNavigate(); 

  // Estado para armazenar os valores dos campos do formulário
  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarsenha: ''
  });

  const [loading, setLoading] = useState(true); 
  const [mensagem, setMensagem] = useState(''); 
  const [erros, setErros] = useState({}); 

  // useEffect para buscar os dados do usuário ao carregar a página
  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/apiplaylist/usuarios/${id}`)
      .then(response => {
        setCampos(response.data); // Preenche os campos do formulário com os dados do usuário
        setLoading(false); // Indica que o carregamento foi concluído
      })
      .catch(error => {
        setMensagem('Houve um problema ao buscar os dados do usuário.'); // Exibe mensagem de erro se a requisição falhar
        setLoading(false); // Indica que o carregamento foi concluído, mesmo em caso de erro
      });
  }, [id]); // O efeito é executado sempre que o 'id' mudar

  // Função para atualizar o estado dos campos conforme o usuário digita
  function handleInputChange(event) {
    const { name, value } = event.target;
    setCampos(prevCampos => ({
      ...prevCampos,
      [name]: value // Atualiza o campo correspondente no estado 'campos'
    }));

    setErros(prevErros => ({
      ...prevErros,
      [name]: '' // Limpa o erro do campo que foi alterado
    }));
  }

  // Função para validar os campos do formulário
  function validarCampos() {
    const novosErros = {};

    if (!campos.nome) {
      novosErros.nome = 'Nome é obrigatório'; // Verifica se o campo 'nome' está preenchido
    }

    if (!campos.email) {
      novosErros.email = 'E-mail é obrigatório'; // Verifica se o campo 'email' está preenchido
    } else if (!/\S+@\S+\.\S+/.test(campos.email)) {
      novosErros.email = 'E-mail inválido'; // Valida o formato do e-mail
    }

    if (campos.senha && campos.senha !== campos.confirmarsenha) {
      novosErros.confirmarsenha = 'Senhas não coincidem'; // Verifica se as senhas são iguais
    }

    setErros(novosErros); // Atualiza o estado 'erros' com os erros encontrados

    return Object.keys(novosErros).length === 0; // Retorna true se não houver erros, false caso contrário
  }

  // Função para tratar o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    if (!validarCampos()) {
      return; // Se a validação falhar, interrompe o envio do formulário
    }

    const dadosParaEnviar = {
      nome: campos.nome,
      email: campos.email,
    };

    if (campos.senha) {
      dadosParaEnviar.senha = campos.senha; // Inclui a senha nos dados a serem enviados, se foi preenchida
    }

    // Envia os dados atualizados do usuário para o backend
    axiosInstance.put(`http://localhost:3001/apiplaylist/usuarios/${id}`, dadosParaEnviar)
      .then(response => {
        setMensagem('Dados editados com sucesso!'); // Exibe mensagem de sucesso

        setTimeout(() => {
          setMensagem(''); // Limpa a mensagem após 3 segundos
          navigate(-1); // Navega para a página anterior
        }, 3000);
      })
      .catch(error => {
        setMensagem('Houve um problema ao atualizar os dados.'); // Exibe mensagem de erro se a requisição falhar
      });
  };

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem de carregamento enquanto os dados são buscados
  }

  return (
    <div className="App">
      <Header title="Editar Perfil" /> {/* Componente de cabeçalho com título */}
      <p></p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Dados de Perfil</h2>
            </legend>

            <div className="field">
              <label>Nome:
                <input type="text" name="nome" id="nome" value={campos.nome} onChange={handleInputChange} />
                {erros.nome && <p className="error">{erros.nome}</p>} {/* Exibe erro se houver */}
              </label>
            </div>

            <div className="field">
              <label>Email:
                <input type="email" name="email" id="email" value={campos.email} onChange={handleInputChange} />
                {erros.email && <p className="error">{erros.email}</p>}
              </label>
            </div>

            <div className="field">
              <label>Senha:
                <input type="password" name="senha" id="senha" value={campos.senha} onChange={handleInputChange} />
                {erros.senha && <p className="error">{erros.senha}</p>}
              </label>
            </div>

            <div className="field">
              <label>Confirmar Senha:
                <input type="password" name="confirmarsenha" id="confirmarsenha" value={campos.confirmarsenha} onChange={handleInputChange} />
                {erros.confirmarsenha && <p className="error">{erros.confirmarsenha}</p>} 
              </label>
            </div>

            <input type="submit" value="Salvar" /> 
          </fieldset>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <p></p>
        <BotaoVoltar />
      </div>
    </div>
  );
}

export default EditarPerfil;





