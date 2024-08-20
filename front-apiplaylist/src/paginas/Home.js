import React, { useContext } from 'react'; 
import logo from '../logo.png'; // Importa o logo da aplicação
import '../CSS/App.css'; 

import Header from '../Header'; 
import Footer from '../Footer'; 

import { Link } from 'react-router-dom'; 
import { AuthContext } from '../autenticacao/autenticacao'; // Importa o contexto de autenticação

function Home() {
  const { authToken, usuarioNome } = useContext(AuthContext); // Acessa o token de autenticação e a função para atualizá-lo

  return (
    <div className="App">
      <Header title="Playlist Maker" /> 

      <header className="App-center">
      <p>Bem-vindo {usuarioNome}!</p>
        <img src={logo} className="App-logo" alt="logo" /> 
        
        <p style={{ margin: 8, fontSize: '26px' }}>Desenvolvido por:</p>
        <p style={{ margin: 0, fontSize: '24px' }}>Eduardo Q. - Mailor - Marven - Paulo Rafael</p>
      

        <nav className="links-nav">
          {authToken ? (
            <>
            </>
          ) : (
            <>
              {/* Se o usuário não estiver autenticado, exibe os links de Login e Cadastro */}
              <Link to="/login">Login</Link> 
              <Link to="/cadastro">Cadastro</Link>
            </>
          )}
        </nav>
      </header>

      <Footer /> 
    </div>
  );
}

export default Home; 






