import React, { useState, useContext } from 'react'; 
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente de ícone do FontAwesome
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importa os ícones de usuário e senha do FontAwesome
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 

import '../CSS/login.css'; 

import { AuthContext } from '../autenticacao/autenticacao'; // Importa o contexto de autenticação para gerenciar o token de autenticação

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 
    const { setAuthToken, checkToken  } = useContext(AuthContext);
    const navigate = useNavigate(); 

    // Função para realizar o login
    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3001/apiplaylist/login', { email, senha }); // Envia os dados de login para o backend
            setAuthToken(response.data.token); // Armazena o token de autenticação no contexto
            checkToken(response.data.token); // Executa checagem de token (checkToken em autenticacao) imediatamente após o login
            navigate('/'); // Redireciona o usuário para a página inicial após o login bem-sucedido
        } catch (error) {
            alert('Erro no login: ' + (error.response ? error.response.data : 'Erro desconhecido')); // Exibe mensagem de erro em caso de falha no login
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <div className="input-container">
                    <FontAwesomeIcon icon={faUser} className="input-icon" /> 
                    <input 
                        type="email" 
                        placeholder="E-mail do usuário" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o e-mail digitado
                    />
                </div>
                <br />
                <div className="input-container">
                    <FontAwesomeIcon icon={faLock} className="input-icon" /> 
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} // Atualiza o estado com a senha digitada
                    />
                </div>
                <br />
                <Link to="/esqueci-minha-senha">Esqueceu a senha?</Link> 
                <div className="button-container">
                    <button onClick={login} className="button">Login</button> 
                </div>
                <br />
                <Link to="/cadastro">Acessar cadastro</Link> 
            </div>
        </div>
    );
};

export default Login; 

