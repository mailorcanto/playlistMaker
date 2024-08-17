const jwt = require('jsonwebtoken'); // Importa a biblioteca jsonwebtoken para lidar com tokens JWT

// Função para validar o token JWT
exports.validaToken = async (req, res) => {
    const { token } = req.body; // Extrai o token do corpo da requisição
    console.log('Validar Token', token); // Loga o token que está sendo validado

    try {
        // Verifica se o token foi fornecido
        if (!token) {
            console.log('Retorna http 400');
            res.status(400).json({ valid: false }); // Mensagem de token não fornecido
        } else {
            // Verifica a validade do token usando a chave secreta (salva no arquivo .env)
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    console.log('Retorna http 401'); 
                    res.status(401).json({ valid: false }); //Mensagem de token inválido
                } else {
                    console.log('Retorna http 200'); 
                    res.status(200).json({ valid: true }); // Mensagem de token for válido
                }
            });
        }
    } catch (err) {
        console.log('Erro ao validar token', err);
    }
};
