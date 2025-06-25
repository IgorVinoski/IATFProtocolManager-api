const express = require('express');
const cors = require('cors');
const routes = require('./routes'); 
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pool = require('./db'); 
pool.query('SELECT 1')
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));