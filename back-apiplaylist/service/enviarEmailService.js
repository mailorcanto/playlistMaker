const nodemailer = require('nodemailer'); // Importa o módulo nodemailer para envio de e-mails

// Configura o transporte de e-mail usando o serviço Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Define o servidor SMTP do Gmail
    port: 465, // Porta para conexão segura (SMTP sobre SSL)
    secure: true, // Usa SSL para conexão segura
    service: 'gmail', // Especifica o serviço de e-mail (Gmail)
    auth: {
        user: process.env.USER_EMAIL, // E-mail do remetente retirado do arquivo .env
        pass: process.env.PWD_EMAIL_GMAIL_APP // Senha ou app password do Gmail retirado do arquivo .env
    }
});

// Função para enviar um e-mail usando o serviço configurado
function enviarEmailService(destinatario, assunto, mensagem) {
    // Define as opções do e-mail, incluindo remetente, destinatário, assunto e conteúdo
    const mailOptions = {
        from: process.env.USER_EMAIL, // Remetente do e-mail
        to: destinatario, // Destinatário do e-mail
        subject: assunto, // Assunto do e-mail
        html: mensagem // Conteúdo da mensagem será formatado como HTML
    };

    // Envia o e-mail usando o transporte configurado
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar email:', error); r
        } else {
            console.log('Email enviado com sucesso:', info.response); 
        }
    });
}

// Exporta a função enviarEmailService para ser usada em outras partes da aplicação
module.exports = { enviarEmailService };
