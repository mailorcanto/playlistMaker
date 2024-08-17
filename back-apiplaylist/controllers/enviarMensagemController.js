const { enviarEmailService } = require('../service/enviarEmailService'); // Importa o serviço de envio de e-mail

// Função para req de envio de e-mail
exports.enviarEmail = async (req, res) => {
    const { destinatario, assunto, mensagem } = req.body; // Pega destinatário, assunto e mensagem do corpo da requisição
    try {
        // Chama o serviço de envio de e-mail com os parâmetros fornecidos
        enviarEmailService(destinatario, assunto, mensagem);
        // Mensagem de sucesso
        res.status(200).json({ success: true, message: 'Email enviado com sucesso' });
    } catch (err) {
        // Mensagem de erro
        console.log('Erro ao enviar E-mail', err);
        res.status(500).json({ error: 'Erro ao enviar E-mail' });
    }
};

