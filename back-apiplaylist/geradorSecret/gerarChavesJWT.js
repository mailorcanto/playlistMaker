const crypto = require('crypto'); // Importa o módulo crypto para operações criptográficas

// Gera um valor aleatório de 64 bytes e converte-o para uma string hexadecimal
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Exibe a string hexadecimal gerada no console
console.log(jwtSecret);
