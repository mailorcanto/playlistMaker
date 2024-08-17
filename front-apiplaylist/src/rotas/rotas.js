import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // Importa componentes do react-router-dom para navegação

// Importa páginas
import Home from '../paginas/Home'; 
import Cadastro from '../paginas/Cadastro'; 
import CriarPlaylist from '../paginas/CriarPlaylist'; 
import CadastroMusica from '../paginas/CadastroMusica'; 
import ListaPlaylists from '../paginas/ListaPlaylists'; 
import ListarPerfis from '../paginas/ListarPerfis'; 
import EditarPerfil from '../paginas/EditarPerfil'; 
import Login from '../paginas/Login'; 
import DetalhesPlaylist from '../componentes/DetalhesPlaylist'; 
import EsqueciMinhaSenha from '../paginas/EsqueciMinhaSenha'; 
import ResetarSenha from '../paginas/ResetarSenha'; 

import { AuthProvider } from '../autenticacao/autenticacao'; // Importa o provedor de autenticação
import PrivateRoute from '../autenticacao/rotasPrivadas'; // Importa o componente de rotas privadas

function Rotas() {
    return (
        <AuthProvider> {/* Envolve o aplicativo com o provedor de autenticação */}
            <BrowserRouter> {/* Configura o BrowserRouter para gerenciar as rotas */}
                <Routes> {/* Define as rotas da aplicação */}
                    {/* Rotas públicas */}
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/esqueci-minha-senha" element={<EsqueciMinhaSenha />} /> 
                    <Route path="/resetar-senha/:token" element={<ResetarSenha />} /> 

                    {/* Rotas privadas */}
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route path="/criar-playlist" element={<PrivateRoute />}> 
                        <Route path="/criar-playlist" element={<CriarPlaylist />} />
                    </Route>

                    <Route path="/cadastro-musica" element={<PrivateRoute />}> 
                        <Route path="/cadastro-musica" element={<CadastroMusica />} />
                    </Route>

                    <Route path="/listas-playlists" element={<PrivateRoute />}> 
                        <Route path="/listas-playlists" element={<ListaPlaylists />} />
                    </Route>

                    <Route path="/listar-perfis" element={<PrivateRoute />}> 
                        <Route path="/listar-perfis" element={<ListarPerfis />} />
                    </Route>

                    <Route path="/editar-perfil/:id" element={<PrivateRoute />}> 
                        <Route path="/editar-perfil/:id" element={<EditarPerfil />} />
                    </Route>

                    <Route path="/playlist/:id" element={<PrivateRoute />}> 
                        <Route path="/playlist/:id" element={<DetalhesPlaylist />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Rotas; 







