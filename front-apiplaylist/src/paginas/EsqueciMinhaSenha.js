import React, { useState } from 'react'; 
import axios from 'axios'; 
import '../CSS/login.css'; 
import BotaoVoltar from '../componentes/BotaoVoltar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente de ícone do FontAwesome
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de usuário do FontAwesome

const EsqueciMinhaSenha = () => {
    const [email, setEmail] = useState(''); 
    const [mensagem, setMensagem] = useState(''); 

    // Função para enviar o pedido de recuperação de senha
    const handlePasswordReset = async () => {
        if (!email) {
            setMensagem('Informar o e-mail'); // Verifica se o e-mail foi informado e exibe mensagem de erro se não
        } else {
            try {
                await axios.post('http://localhost:3001/apiplaylist/esqueci-minha-senha', { email }); // Envia o e-mail para o backend
                setMensagem('Um link de recuperação de senha foi enviado para o seu e-mail.'); // Mensagem de sucesso
            } catch (error) {
                setMensagem('Erro ao enviar e-mail de recuperação: '); // Mensagem de erro em caso de falha na requisição
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Esqueci Minha Senha</h1>
                <div className="input-container">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input 
                        type="email" 
                        placeholder="Digite seu e-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o e-mail digitado
                        required
                    />
                </div>
                <br></br>
                <button onClick={handlePasswordReset} className="button">Enviar</button>
                {/* Exibe a mensagem de erro ou sucesso */}
                {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
                <p></p>
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    );
};

export default EsqueciMinhaSenha; 
