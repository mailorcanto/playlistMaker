import React, { useContext } from 'react'; 
import logo from '../logo.png'; // Importa o logo da aplicação
import '../CSS/App.css'; 

import Header from '../Header'; 
import Footer from '../Footer'; 

import { Link } from 'react-router-dom'; 
import { AuthContext } from '../autenticacao/autenticacao'; // Importa o contexto de autenticação

function Home() {
  const { authToken } = useContext(AuthContext); // Acessa o token de autenticação e a função para atualizá-lo

  return (
    <div className="App">
      <Header title="Playlist Maker" /> 

      <header className="App-center">
        <img src={logo} className="App-logo" alt="logo" /> 
        <p>Bem-vindo ao Playlist Maker!</p>
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






