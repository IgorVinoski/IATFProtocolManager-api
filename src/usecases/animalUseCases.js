const pool = require('../db');
const Animal = require('../entities/Animal');

async function getAllAnimals() {
  const { rows } = await pool.query('SELECT * FROM animals');
  return rows.map(row => new Animal(row));
}

async function createAnimal({ name, tagNumber, breed, weight, age, reproductiveHistory, imageUrl }) {
  const { rows } = await pool.query(
    'INSERT INTO animals (name, tag_number, breed, weight, age, reproductive_history, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, tagNumber, breed, weight, age, reproductiveHistory, imageUrl]
  );
  return new Animal(rows[0]);
}


async function updateAnimal(id, { name, tagNumber, breed, weight, age, reproductiveHistory, imageUrl }) {
  const { rows } = await pool.query(
    'UPDATE animals SET name = $2, tag_number = $3, breed = $4, weight = $5, age = $6, reproductive_history = $7, image_url = $8 WHERE id = $1 RETURNING *',
    [id, name, tagNumber, breed, weight, age, reproductiveHistory, imageUrl]
  );
  if (rows.length === 0) {
    return null;
  }
  return new Animal(rows[0]);
}

async function deleteAnimal(id) {
  try {
    await pool.query('DELETE FROM protocol_animals WHERE animal_id = $1', [id]);

    const { rowCount } = await pool.query('DELETE FROM animals WHERE id = $1', [id]);
    return rowCount > 0;
  } catch (error) {
    console.error('Erro ao deletar animal e seus relacionamentos:', error);
    throw error; 
  }
}
async function getAnimalsStats() {
  const totalQuery = await pool.query(`
    SELECT COUNT(*) AS total
    FROM protocol_animals
  `);

  const pregnantQuery = await pool.query(`
    SELECT COUNT(*) AS pregnant
    FROM protocol_animals
    WHERE pregnant = true`);

  const total = parseInt(totalQuery.rows[0].total, 10);
  const pregnant = parseInt(pregnantQuery.rows[0].pregnant, 10);

  return {
    total_animals: total,
    pregnant_animals: pregnant,
    pregnancy_rate: total > 0 ? pregnant / total : 0
  };
}

module.exports = {
  getAnimalsStats,
  getAllAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,   
};