import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom para navegação entre páginas
import { useContext } from 'react'; 
import { AuthContext } from './autenticacao/autenticacao'; 

function Header({ title }) {
    const { authToken, setAuthToken } = useContext(AuthContext); // Acessa o token de autenticação e a função para definir o token a partir do contexto de autenticação

    // Função para realizar o logout
    const handleLogout = () => {
        setAuthToken(''); // Limpa o token de autenticação, desconectando o usuário
    };

    return (
        <header className="header">
            <h1>{title}</h1> 
            <nav className="links-nav">
                <Link to="/">Home</Link>
                {authToken && (
                    <>
                        {/* Se o usuário estiver autenticado (authToken presente), exibe os links de navegação específicos */}
                        <Link to="/criar-playlist">Criar Playlist</Link> 
                        <Link to="/cadastro-musica">Cadastrar Música</Link> 
                        <Link to="/listas-playlists">Listar Playlists</Link> 
                        <Link to="/listar-perfis">Listar Perfis</Link> 
                        <Link to="/" onClick={handleLogout}>Logout</Link> 
                    </>
                )}
                {!authToken && (
                    <>
                        {/* Se o usuário não estiver autenticado (authToken ausente), exibe os links de Login e Cadastro */}
                        <Link to="/login">Login</Link> 
                        <Link to="/cadastro">Cadastro</Link> 
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;






  