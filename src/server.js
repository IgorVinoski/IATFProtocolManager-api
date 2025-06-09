// server.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Suas rotas principais
require('dotenv').config(); // Carrega as variáveis de ambiente aqui

const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas da sua API estarão sob /api
// Ex: /api/auth/login, /api/animals, etc.
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// O pool de conexão já está configurado e exportado em db.js
// Você pode adicionar um teste de conexão aqui se quiser
const pool = require('./db'); // Importa o pool para um teste de conexão
pool.query('SELECT 1')
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));