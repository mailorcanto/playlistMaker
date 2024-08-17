import React, { useEffect } from 'react'; 
import '../CSS/ModalOk.css'; 

const ModalCriarPlaylist = ({ show, handleClose, title, children }) => {
  
  // Efeito para fechar o modal automaticamente após 3 segundos, quando ele for mostrado
  useEffect(() => {
    if (show) { // Verifica se o modal deve ser exibido
      const timer = setTimeout(() => {
        handleClose(); // Fecha o modal após 3 segundos
      }, 3000);
      
      return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado ou quando 'show' muda
    }
  }, [show, handleClose]); // O efeito é executado quando 'show' ou 'handleClose' mudam

  if (!show) {
    return null;
  }

  // Renderiza o modal 
  return (
    <div className="modal-overlay"> {/* Div que cobre toda a tela e serve como fundo do modal */}
      <div className="modal-content"> 
        <h2>{title}</h2> {/* Título do modal, passado como prop */}
        <div className="modal-body">
          {children} {/* Conteúdo do corpo do modal, passado como children */}
        </div>
        <div className="modal-actions"> {/* Botão de ação no modal */}
          <button onClick={handleClose}>Ok</button> {/* Botão para fechar o modal */}
        </div>
      </div>
    </div>
  );
};

export default ModalCriarPlaylist;



