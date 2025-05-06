const pool = require('../db');
const Animal = require('../entities/Animal');

async function getAllAnimals() {
  const { rows } = await pool.query('SELECT * FROM animals');
  return rows.map(row => new Animal(row));
}
export async function createAnimal(req, res) {
  try {
    console.log("Recebido POST /api/animals", req.body);

    // Valide aqui: se algum campo for obrigatório, jogue erro
    const { tagNumber, name, breed, weight, age } = req.body;
    if (!tagNumber || !name) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const animal = await prisma.animal.create({
      data: {
        tagNumber,
        name,
        breed,
        weight: parseFloat(weight),
        age: parseInt(age),
        reproductiveHistory: req.body.reproductiveHistory || '',
        imageUrl: req.body.imageUrl || '',
      }
    });

    return res.status(201).json(animal);
  } catch (err) {
    console.error("Erro ao criar animal:", err);
    return res.status(500).json({ error: 'Erro interno ao criar animal' });
  }
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
    // Excluir os registros na tabela de junção (protocol_animals) primeiro
    await pool.query('DELETE FROM protocol_animals WHERE animal_id = $1', [id]);

    // Agora, excluir o animal da tabela animals
    const { rowCount } = await pool.query('DELETE FROM animals WHERE id = $1', [id]);
    return rowCount > 0;
  } catch (error) {
    console.error('Erro ao deletar animal e seus relacionamentos:', error);
    throw error; // Rejeitar o erro para que o controller possa lidar com ele
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