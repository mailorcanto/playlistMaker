import React, { createContext, useState, useEffect } from 'react'; // Importa React e hooks para criar contexto, gerenciar estados e efeitos colaterais
import { jwtDecode } from 'jwt-decode'; // Importa a função jwtDecode para decodificar tokens JWT

// Cria o contexto de autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(''); // Estado para armazenar o token de autenticação
    const [usuarioId, setUsuarioId] = useState(null); // Estado para armazenar o ID do usuário
    const [usuarioNome, setUsuarioNome] = useState(''); // Estado para armazenar o nome do usuário

    // Função para verificar o token e decodificar as informações do usuário
    const checkToken = (token) => {
        if (token) {
            try {
                const { usuarioId, usuarioNome } = jwtDecode(token); // Decodifica o token JWT para obter ID e nome do usuário
                setAuthToken(token); // Armazena o token de autenticação no estado
                setUsuarioId(usuarioId); // Armazena o ID do usuário no estado
                setUsuarioNome(usuarioNome); // Armazena o nome do usuário no estado
                console.log('Token:', token, 'Usuário ID:', usuarioId, 'Nome:', usuarioNome); // Loga as informações decodificadas no console
            } catch {
                localStorage.removeItem('@Auth:token'); // Remove o token inválido do localStorage em caso de erro na decodificação
            }
        }
    };

    // useEffect para verificar se há um token armazenado no localStorage quando o componente for montado
    useEffect(() => {
        const token = localStorage.getItem('@Auth:token'); // Recupera o token do localStorage
        checkToken(token); // Chama a função para verificar o token
    }, []); // Executa o efeito apenas uma vez, após o componente ser montado

    // useEffect para armazenar ou remover o token no localStorage sempre que o authToken mudar
    useEffect(() => {
        if (authToken) {
            localStorage.setItem('@Auth:token', authToken); // Armazena o token no localStorage
        } else {
            localStorage.removeItem('@Auth:token'); // Remove o token do localStorage se authToken estiver vazio
            setUsuarioId(null); // Reseta o ID do usuário no estado
        }
    }, [authToken]); // O efeito será executado sempre que o authToken mudar

    return (
        // Provedor de contexto que disponibiliza o token de autenticação, a função para defini-lo, a verificação do token, o ID e o nome do usuário para os componentes filhos
        <AuthContext.Provider value={{ authToken, setAuthToken, checkToken, usuarioId, usuarioNome }}>
            {children} {/* Renderiza os componentes filhos que estão dentro do AuthProvider */}
        </AuthContext.Provider>
    );
};



