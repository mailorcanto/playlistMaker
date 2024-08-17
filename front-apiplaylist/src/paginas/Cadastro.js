import Header from '../Header'; 
import '../CSS/App.css'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 

import React, { useState } from 'react';

import axiosInstance from '../axios/configuracaoAxios';

function Cadastro() {
    // Cria novo estado para armazenar os valores dos campos do formulário
    const [campos, setCampos] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarsenha: ''
    });

    const [mensagem, setMensagem] = useState('');
    const [erros, setErros] = useState({});

    // Função para atualizar os estados dos campos conforme o usuário digita
    function handleInputChange(event) {
        const { name, value } = event.target; // Obtém o nome e o valor do campo que foi alterado
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value // Atualiza o campo correspondente no estado 'campos'
        }));

        // Limpa o erro do campo que foi alterado
        setErros(prevErros => ({
            ...prevErros,
            [name]: ''
        }));
    }

    // Função para validar os campos do formulário
    function validarCampos() {
        const novosErros = {};

        // Validação para o campo 'nome'
        if (!campos.nome) {
            novosErros.nome = 'Nome é obrigatório';
        }

        // Validação para o campo 'email'
        if (!campos.email) {
            novosErros.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(campos.email)) {
            novosErros.email = 'Email inválido';
        }

        // Validação para o campo 'senha'
        if (!campos.senha) {
            novosErros.senha = 'Senha é obrigatória';
        }

        // Validação para o campo 'confirmarsenha'
        if (!campos.confirmarsenha) {
            novosErros.confirmarsenha = 'Confirmar Senha é obrigatório';
        } else if (campos.confirmarsenha !== campos.senha) {
            novosErros.confirmarsenha = 'Senha e Confirmar Senha devem ser iguais';
        }

        // Atualiza o estado 'erros' com os erros encontrados
        setErros(novosErros);

        // Retorna 'true' se não houver erros, 'false' se houve
        return Object.keys(novosErros).length === 0;
    }

    // Função para tratar o envio do formulário
    function handleFormSubmit(event) {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Valida os campos antes de continuar
        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos); // Log dos campos submetidos para debug

        // Envia os dados do formulário para o backend utilizando axios
        axiosInstance.post('/usuarios', {
            nome: campos.nome,
            email: campos.email,
            senha: campos.senha
        })
        .then(response => {
            // Define a mensagem de sucesso após o cadastro
            setMensagem('Cadastro realizado com sucesso!');
            console.log(response.data);

            // Limpa os campos do formulário após o envio
            setCampos({
                nome: '',
                email: '',
                senha: '',
                confirmarsenha: ''
            });

            // Limpa a mensagem de sucesso após 3 segundos
            setTimeout(() => {
                setMensagem('');
            }, 3000);
        })
        .catch(error => {
            // Exibe uma mensagem de erro caso a requisição falhe
            console.error('Houve um erro ao enviar o formulário:', error);
            setMensagem('Erro ao enviar o formulário. Tente novamente.');
        });
    }

    return (
        <div className="App">
            {/* Componente de cabeçalho com título */}
            <Header title="Cadastro de Usuário" />
            <p></p>
            <div className="form-container">
                {/* Formulário de cadastro com campos controlados */}
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Dados de Cadastro</h2>
                        </legend>

                        {/* Campo de texto para nome */}
                        <div className="field">
                            <label>Nome:
                                <input type="text" name="nome" id="nome" value={campos.nome} onChange={handleInputChange} />
                                {erros.nome && <p className="error">{erros.nome}</p>} {/* Exibe erro se houver */}
                            </label>
                        </div>

                        {/* Campo de texto para email */}
                        <div className="field">
                            <label>Email:
                                <input type="email" name="email" id="email" value={campos.email} onChange={handleInputChange} />
                                {erros.email && <p className="error">{erros.email}</p>} {/* Exibe erro se houver */}
                            </label>
                        </div>

                        {/* Campo de texto para senha */}
                        <div className="field">
                            <label>Senha:
                                <input type="password" name="senha" id="senha" value={campos.senha} onChange={handleInputChange} />
                                {erros.senha && <p className="error">{erros.senha}</p>} {/* Exibe erro se houver */}
                            </label>
                        </div>

                        {/* Campo de texto para confirmação de senha */}
                        <div className="field">
                            <label>Confirmar Senha:
                                <input type="password" name="confirmarsenha" id="confirmarsenha" value={campos.confirmarsenha} onChange={handleInputChange} onBlur={validarCampos} />
                                {erros.confirmarsenha && <p className="error">{erros.confirmarsenha}</p>} {/* Exibe erro se houver */}
                            </label>
                            <p></p>
                        </div>

                        {/* Botão de submissão do formulário */}
                        <input type="submit" value="Cadastrar" />
                    </fieldset>
                </form>
                {/* Exibe a mensagem de sucesso ou erro */}
                {mensagem && <p>{mensagem}</p>}
                <p></p>
                {/* Botão para voltar à página anterior */}
                <BotaoVoltar />
            </div>
        </div>
    )
}

export default Cadastro; // Exporta o componente de cadastro para uso em outras partes da aplicação


