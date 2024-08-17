import React from 'react'; 
import '../CSS/Modal.css';

// Define o componente Modal
const Modal = ({ show, handleClose, handleConfirm, title, children }) => {
  if (!show) {
    return null;
  }

  // Renderiza o modal quando 'show' for 'true'
  return (
    <div className="modal-overlay"> {/* Div que cobre toda a tela e serve como fundo do modal */}
      <div className="modal-content"> 
        <h2>{title}</h2> {/* Título do modal, passado como prop */}
        <div className="modal-body">
          {children} {/* Conteúdo do corpo do modal, passado como children */}
        </div>
        <div className="modal-actions"> {/* Botões de ação do modal */}
          <button onClick={handleClose}>Cancelar</button> {/* Botão para fechar o modal, chama 'handleClose' */}
          <button onClick={handleConfirm}>Confirmar</button> {/* Botão para confirmar a ação, chama 'handleConfirm' */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
