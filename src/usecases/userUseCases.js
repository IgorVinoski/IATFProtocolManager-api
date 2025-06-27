const pool = require('../db');
const bcrypt = require('bcryptjs');

async function createUser(userData) {
  const { name, email, password, role } = userData;

  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userExists.rows.length > 0) {
    return null;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    user.matchPassword = async function(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    return user;
  }
  return null;
}

async function findUserById(id) {
  const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function updateUser(id, newData) {
  try {
    const { name, email, password, role } = newData; 
    let queryText = 'UPDATE users SET name = $1, email = $2, role = $3'; 
    const queryParams = [name, email, role, id]; 
    let paramIndex = 4; 

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      queryText += `, password = $${paramIndex}`; 
      queryParams.splice(3, 0, hashedPassword); 
      paramIndex++; 
    }

    queryText += ` WHERE id = $${paramIndex} RETURNING id, name, email, role`;

    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      throw new Error('Usuário não encontrado.');
    }
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar usuário no banco de dados:', error);
    throw new Error('Erro ao atualizar usuário.');
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
};
