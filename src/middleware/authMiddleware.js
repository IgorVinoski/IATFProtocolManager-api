// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userUseCases = require('../usecases/userUseCases');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extrai o token "Bearer TOKEN"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário no banco de dados para garantir que ele ainda existe
      const user = await userUseCases.findUserById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }

      req.user = { // Adiciona as informações do usuário (id, email, role) à requisição
        id: user.id,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (error) {
      console.error('Token inválido ou expirado:', error.message);
      return res.status(401).json({ message: 'Não autorizado, token falhou ou expirou.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para acessar esta rota.' });
    }
    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};