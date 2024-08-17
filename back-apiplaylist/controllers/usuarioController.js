const axios = require('axios'); // Importa a biblioteca axios para requisições HTTP

// Importa o modelo Usuario
const Usuario = require('../modelo/Usuario');

// Importa os operadores do Sequelize para consultas avançadas
const { Op } = require('sequelize');

// Importa o módulo de criptografia bcrypt
const bcrypt = require('bcryptjs');

// Importa o módulo de Web Token para gerar e verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa o modelo EsqueciMinhaSenha para gerenciar as solicitações de redefinição de senha
const EsqueciMinhaSenha = require('../modelo/EsqueciMinhaSenha');

// Função para criar um novo usuário
exports.createusuario = async (req, res) => {
  console.log('createusuario');
  const { nome, email, senha } = req.body;

  // Gera o hash da senha (criptografia) antes de salvar no banco de dados
  const hashedPassword = getHashedPassword(senha);
  
  try {
    const novoUsuario = await Usuario.create({ nome, email, senha: hashedPassword });
    res.status(201).json(novoUsuario); // Retorna o novo usuário criado
  } catch (err) {
    console.log("Erro ao criar usuário", err);
    res.status(500).json({ error: 'Erro ao criar usuário' }); 
  }
};

// Função para obter todos os usuários
exports.getusuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Recupera todos os usuários do banco de dados
    res.status(200).json(usuarios); // Retorna a lista de usuários
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
};

// Função para atualizar usuário existente
exports.updateusuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findByPk(id); // Busca o usuário pelo ID
    if (usuarioExistente) {
      // Atualiza os campos de usuário se forem fornecidos novos valores
      usuarioExistente.nome = nome || usuarioExistente.nome;
      usuarioExistente.email = email || usuarioExistente.email;
      if (senha) {
        usuarioExistente.senha = getHashedPassword(senha); // Atualiza a senha com hash (criptografia), se fornecida
      }
      usuarioExistente.updatedAt = new Date();
      await usuarioExistente.save(); // Salva as alterações no banco de dados
      res.status(200).json(usuarioExistente); // Retorna o usuário atualizado
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.log('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' }); 
  }
};

// Função para buscar um usuário pelo ID
exports.buscarId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id); // Busca o usuário pelo ID

    if (usuario) {
      res.status(200).json(usuario); // Retorna o usuário encontrado
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' }); 
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o usuário' }); 
  }
};

// Função para buscar um usuário por e-mail
exports.buscarUsuarioPorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const usuarios = await Usuario.findAll({ where: { email: { [Op.like]: `%${email}%` } } });

    if (usuarios.length > 0) {
      res.status(200).json(usuarios); // Retorna usuário com o e-mail buscado
    } else {
      res.status(404).json({ error: 'Nenhum usuário encontrado com esse email' }); 
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar por email do usuário' }); 
  }
};

// Função para deletar um usuário
exports.deleteusuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy(); // Deleta o usuário do banco de dados
      res.status(204).send(); // Retorna status 204 (sem conteúdo) após a exclusão bem-sucedida
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' }); 
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário' }); 
  }
};

// Função auxiliar para gerar o hash da senha
function getHashedPassword(senha) {
  console.log('getHashedPassword', senha);
  const salt = bcrypt.genSaltSync(10); // Gera o salt para o hash
  const hashedPassword = bcrypt.hashSync(senha, salt); // Gera o hash da senha com o salt
  return hashedPassword; // Retorna a senha hash
}

// Função para efetuar o login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (!usuarioExistente) {
      return res.status(400).send('Dados incorretos - cod 001!'); 
    }

    const isPasswordValid = bcrypt.compareSync(senha, usuarioExistente.senha); // Compara a senha fornecida com o hash armazenado

    if (!isPasswordValid) {
      return res.status(400).send('Dados incorretos!'); 
    }

    // Gera um token JWT para autenticação do usuário
    const token = jwt.sign({ usuarioId: usuarioExistente.id }, process.env.JWT_KEY, { expiresIn: '30m' });
    res.send({ token }); // Retorna o token
  } catch (err) {
    console.log('Erro no login', err);
    res.status(400).send('Erro no login: ' + err.message); 
  }
};

// Função para validar o token JWT
exports.validarToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' }); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Verifica o token JWT
    const usuario = await Usuario.findByPk(decoded.usuarioId);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' }); 
    }

    res.status(200).json({ valid: true }); // Retorna sucesso se o token for válido e o usuário existir
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' }); // Retorna erro se o token for inválido
  }
};

// Função para solicitar a recuperação de senha
exports.esqueciMinhaSenha = async (req, res) => {
  console.log('esqueciMinhaSenha');
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario) {
      // Gera um token de 15 minutos para redefinição de senha
      const token = gerarToken(usuario, '15m');
      const usuarioId = usuario.id;
      const novaSolicitacao = await EsqueciMinhaSenha.create({ usuarioId, email, token });
      
      // Envia um e-mail com o link de recuperação de senha
      const assunto = 'Recuperar senha';
      const resetUrl = `http://localhost:3000/resetar-senha/${novaSolicitacao.token}`;
      const mensagem = `
          <h1>Você solicitou a redefinição de senha</h1>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      `;

      const response = await axios.post('http://localhost:3001/apiplaylist/enviaremail', {
        destinatario: email,
        assunto: assunto,
        mensagem: mensagem
      });

      if (response.status === 200) {
        console.log('E-mail de recuperação enviado com sucesso.');
        res.status(200).json('E-mail de recuperação enviado com sucesso.');
      } else {
        console.log('Erro ao enviar o e-mail de recuperação');
        res.status(500).json({ error: 'Erro ao enviar o e-mail de recuperação' });
      }
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' }); 
    }
  } catch (err) {
    console.log('Erro ao buscar o usuário:', err);
    res.status(500).json({ error: 'Erro ao buscar o usuário' }); 
  }
};

// Função para resetar a senha do usuário
exports.resetarSenha = async (req, res) => {
  const { senha, token } = req.body;
  
  try {
    const solicitacao = await EsqueciMinhaSenha.findOne({ where: { token } });

    if (solicitacao) {
      try {
        const response = await axios.post('http://localhost:3001/apiplaylist/validarToken', { token });

        if (response.status === 200) {
          console.log('Token válido.......:');
          const usuario = await Usuario.findByPk(solicitacao.usuarioId);
          if (usuario) {
            const hashedPassword = getHashedPassword(senha); // Gera o hash da nova senha
            usuario.updatedAt = new Date();
            usuario.senha = hashedPassword;
            await usuario.save(); // Salva a nova senha no banco de dados
            res.status(200).json('Senha alterada com sucesso'); // Retorna sucesso após a senha ser alterada
          }
        } else {
          console.log('Token inválido');
          res.status(500).json({ error: 'Token inválido' }); 
        }
      } catch (erro) {
        res.status(401).json({ error: 'Token inválido' }); 
      }
    } else {
      console.log('Dados não encontrados');
      res.status(401).json({ error: 'Dados não encontrados' }); 
    }
  } catch (err) {
    console.log('Erro ao resetar a senha', err);
    res.status(500).json({ error: 'Erro ao resetar a senha' }); 
  }
};

// Função para gerar o token JWT com tempo de expiração
function gerarToken(usuario, tempoExpiracao) {
  return jwt.sign({ usuarioId: usuario.id }, process.env.JWT_KEY, { expiresIn: tempoExpiracao });
}
