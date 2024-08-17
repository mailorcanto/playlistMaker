import React, { useContext, useEffect, useState, useCallback } from 'react'; // Importa React e hooks para gerenciar context, effects, states e callbacks
import { Navigate, Outlet } from 'react-router-dom'; // Importa componentes para navegação e exibição condicional de rotas
import { AuthContext } from './autenticacao'; // Importa o contexto de autenticação
import axios from 'axios'; 

const PrivateRoute = () => {
    const { authToken, setAuthToken } = useContext(AuthContext); // Acessa o token de autenticação e a função para definir o token a partir do contexto de autenticação
    const [isValid, setIsValid] = useState(null); // Estado para armazenar se o token é válido ou não

    // Função para verificar a validade do token
    const verifyToken = useCallback(async () => {
        try {
            // Envia o token para o backend para verificar sua validade
            const response = await axios.post('http://localhost:3001/apiplaylist/usuarios/validarToken', { token: authToken });
            if (response.data.valid) {
                setIsValid(true); // Se o token for válido, define isValid como true
            } else {
                setAuthToken(null); // Se o token for inválido, remove o token do contexto
                localStorage.removeItem('@Auth:token'); // Remove o token do localStorage
                setIsValid(false); // Define isValid como false
            }
        } catch {
            setAuthToken(null); // Em caso de erro, remove o token do contexto
            localStorage.removeItem('@Auth:token'); // Remove o token do localStorage
            setIsValid(false); // Define isValid como false
        }
    }, [authToken, setAuthToken]); // O callback depende de authToken e setAuthToken

    // Efeito para verificar o token ao carregar o componente
    useEffect(() => {
        if (authToken) {
            verifyToken(); // Verifica o token se ele estiver presente
        } else {
            console.log('PrivateRoute: Remove o Token authToken', authToken);
            setAuthToken(null); // Se não houver token, remove do contexto
            localStorage.removeItem('@Auth:token'); // Remove o token do localStorage
            setIsValid(false); // Define isValid como false
        }

        // Configura um intervalo para verificar o token periodicamente
        const intervalId = setInterval(() => {
            if (authToken) {
                verifyToken(); // Verifica o token periodicamente se ele estiver presente
            } else {
                setIsValid(false); // Define isValid como false se o token não estiver presente
            }
        }, 5000); // Verifica a cada 5 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [authToken, verifyToken, setAuthToken]); // O efeito depende de authToken, verifyToken e setAuthToken

    // Se o estado isValid ainda for null, exibe mensagem de carregamento
    if (isValid === null) {
        return <div>Loading...</div>;
    }

    // Se o token for válido, mostra o conteúdo; caso contrário, vai para a página de login
    return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 



