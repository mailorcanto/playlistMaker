import React, { createContext, useState, useEffect } from 'react'; // Importa React e hooks para criar contexto, gerenciar states e effects
import { jwtDecode } from 'jwt-decode'; // Importa a função jwtDecode para decodificar tokens JWT

// Cria contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(''); 
    const [usuarioId, setUsuarioId] = useState(null); 

    // useEffect para verificar se há token de autenticação armazenado no localStorage no carregamento da aplicação
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('@Auth:token'); // Recupera o token do localStorage
            if (token) {
                try {
                    const decodedToken = jwtDecode(token); // Decodifica o token JWT
                    console.log("Token decodificado:", decodedToken); // Log para verificar o token decodificado no console
                    setAuthToken(token); // Armazena o token no estado
                    setUsuarioId(decodedToken.usuarioId); // Armazena o ID do usuário no estado
                    console.log("ID do usuário definido:", decodedToken.usuarioId); // Log para verificar ID do usuário
                } catch (error) {
                    console.error("Erro ao decodificar o token", error); 
                    localStorage.removeItem('@Auth:token'); // Remove token inválido do localStorage
                }
            }
        };
        checkToken(); // Chama a função para verificar token no carregamento da aplicação
    }, []); // Array vazio [] indica que o efeito será executado apenas uma vez, após o componente ser montado

    // useEffect para armazenar ou remover o token no localStorage sempre que o authToken mudar
    useEffect(() => {
        if (authToken) {
            console.log("Armazenando token no localStorage:", authToken); // Log para verificar o armazenamento do token
            localStorage.setItem('@Auth:token', authToken); // Armazena o token no localStorage
        } else {
            console.log("Removendo token do localStorage"); // Log para verificar a remoção do token
            localStorage.removeItem('@Auth:token'); // Remove o token do localStorage
            setUsuarioId(null); // Reseta o ID do usuário no estado
        }
    }, [authToken]); // O efeito será executado sempre que o authToken mudar

    return (
        // Provedor de contexto que disponibiliza o token de autenticação, a função para defini-lo e o ID do usuário para os componentes filhos
        <AuthContext.Provider value={{ authToken, setAuthToken, usuarioId }}>
            {children} {/* Renderiza os componentes filhos que estão dentro do AuthProvider */}
        </AuthContext.Provider>
    );
};




