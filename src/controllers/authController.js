// controllers/authController.js
const jwt = require('jsonwebtoken');
const userUseCases = require('../usecases/userUseCases');
require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expira em 1 hora
  });
};

async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const newUser = await userUseCases.createUser({ name, email, password, role });

    if (!newUser) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    const token = generateToken(newUser.id, newUser.email, newUser.role);
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: token,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro no servidor ao registrar usuário.', error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userUseCases.findUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user.id, user.email, user.role);
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor ao fazer login.', error: error.message });
  }
}

module.exports = {
  register,
  login,
};