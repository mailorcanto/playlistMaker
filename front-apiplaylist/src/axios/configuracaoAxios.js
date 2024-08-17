import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Obtém o token de autenticação armazenado no localStorage
const token = localStorage.getItem('@Auth:token');

// Cria uma instância do axios com configurações personalizadas
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/apiplaylist', // Define a URL base para todas as requisições
    headers: {
        'Authorization': `Bearer ${token}` // Define o cabeçalho Authorization com o token JWT para autenticação
    }
});

export default axiosInstance; // Exporta a instância do axios para uso em outras partes da aplicação
