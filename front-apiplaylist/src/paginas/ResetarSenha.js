import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useParams } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente de ícone do FontAwesome
import { faLock } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de senha do FontAwesome
import { Link } from 'react-router-dom'; 

const ResetarSenha = () => {
    const [senha, setSenha] = useState(''); 
    const [confirmaSenha, setConfirmaSenha] = useState(''); 
    const [mensagem, setMensagem] = useState(''); 
    const { token } = useParams(); 

    // Função para tratar o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Verifica se as senhas digitadas são diferentes
        if (senha !== confirmaSenha) {
            setMensagem('As senhas não coincidem');
        }

        try {
            // Envia a nova senha e o token para o backend
            const response = await axios.post(`http://localhost:3001/apiplaylist/resetarsenha`, {
                senha,
                token
            });
            console.log('response', response.status);

            // Se a resposta for bem-sucedida, exibe mensagem de sucesso
            if (response.status === 200) {
                console.log('200');
                setMensagem('Senha redefinida com sucesso');
            }
        } catch (error) {
            setMensagem('Token inválido!', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Redefinir Senha</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FontAwesomeIcon icon={faLock} className="input-icon" /> {/* Exibindo ícone de senha */}
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado com a nova senha digitada
                            required
                        />
                    </div>
                    <br></br>
                    <div className="input-container">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)} // Atualiza o estado com a confirmação da senha digitada
                            required
                        />
                    </div>
                    <br></br>
                    <button type="submit" className="button">Redefinir Senha</button>
                </form>
                {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>} {/* Exibe mensagem de sucesso ou erro */}
                <br></br>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default ResetarSenha;
