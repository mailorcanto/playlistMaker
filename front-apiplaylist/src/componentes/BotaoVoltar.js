import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Define o componente BotaoVoltar
const BotaoVoltar = () => {
    const navigate = useNavigate(); 

    // Função para navegar de volta à página anterior
    const handleGoBack = () => {
        navigate(-1); // Navega para a página anterior no histórico de navegação
    };

    // Renderiza o botão "Voltar" e associa a função handleGoBack ao evento onClick
    return (
        <div>
            <button onClick={handleGoBack} className="btn-voltar">
                Voltar
            </button>
        </div>
    );
}

export default BotaoVoltar;

