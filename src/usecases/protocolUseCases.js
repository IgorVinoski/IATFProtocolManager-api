const pool = require('../db');
const Protocol = require('../entities/Protocol');

async function getAllProtocols() {
  const { rows } = await pool.query('SELECT id, name, startdate, hormones, bull, notifications FROM protocols');
  const protocols = [];

  for (const row of rows) {
    const { rows: animalRows } = await pool.query(
      'SELECT animal_id, pregnant FROM protocol_animals WHERE protocol_id = $1',
      [row.id]
    );
    const animals = animalRows.map(a => ({ id: a.animal_id, pregnant: a.pregnant }));
    protocols.push(new Protocol({ ...row, startDate: row.startdate, animals }));
  }

  return protocols;
}

async function createProtocol({ name, startDate, hormones, bull, notifications, animals = [] }) {
  const { rows } = await pool.query(
    'INSERT INTO protocols (name, start_date, hormones, bull, notifications) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, startDate, hormones, bull, notifications]
  );
  const protocol = rows[0];
  for (const animal of animals) {
    await pool.query(
      'INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES ($1, $2, $3)',
      [protocol.id, animal.id, animal.pregnant]
    );
  }
  return new Protocol({ ...protocol, animals: animals.map(a => ({ id: a.id })) });
}

async function getProtocolById(id) {
  const { rows } = await pool.query('SELECT * FROM protocols WHERE id = $1', [id]);
  if (rows.length === 0) {
    return null;
  }
  const protocolData = rows[0];
  const { rows: animalRows } = await pool.query(
    'SELECT animal_id, pregnant FROM protocol_animals WHERE protocol_id = $1',
    [id]
  );
  const animals = animalRows.map(a => ({ id: a.animal_id, pregnant: a.pregnant }));
  return new Protocol({ ...protocolData, animals });
}

async function updateProtocol(id, { name, startDate, hormones, bull, notifications, animals = [] }) {
  console.log('UPDATE!',startDate )
  const { rows } = await pool.query(
    'UPDATE protocols SET name = $2, startDate = $3, hormones = $4, bull = $5, notifications = $6 WHERE id = $1 RETURNING *',
    [id, name, startDate, hormones, bull, notifications]
  );
  if (rows.length === 0) {
    return null;
  }
  const updatedProtocol = rows[0];

  // Remove as associações de animais existentes para este protocolo
  await pool.query('DELETE FROM protocol_animals WHERE protocol_id = $1', [id]);

  // Adiciona as novas associações de animais
  for (const animal of animals) {
    await pool.query(
      'INSERT INTO protocol_animals (protocol_id, animal_id, pregnant) VALUES ($1, $2, $3)',
      [id, animal.id, animal.pregnant]
    );
  }

  return new Protocol({ ...updatedProtocol, animals: animals.map(a => ({ id: a.id })) });
}

async function getProtocolsStats() {
  const { rows } = await pool.query(
    'SELECT DISTINCT(protocol_animals.protocol_id) , COUNT(*) as total, SUM(CASE WHEN pregnant THEN 1 ELSE 0 END) as pregnant_count   FROM protocol_animals GROUP BY protocol_animals.protocol_id',
  );
  const stats = [];
  for (const row of rows) {
    stats.push({
      total: row.total,
      protocolId: row.protocol_id,
      pregnantCount: row.pregnant_count,
      conceptionRate: row.total > 0 ? (row.pregnant_count / row.total) * 100 : 0,
    });
  }
  return { stats };
}

async function deleteProtocol(id) {
  try {
    // 1. Deletar os registros dependentes na tabela protocol_animals
    await pool.query('DELETE FROM protocol_animals WHERE protocol_id = $1', [id]);

    // 2. Deletar o protocolo da tabela protocols
    const { rowCount } = await pool.query('DELETE FROM protocols WHERE id = $1', [id]);
    return rowCount > 0; // Retorna true se o protocolo foi deletado
  } catch (error) {
    console.error('Erro ao deletar protocolo e seus animais associados:', error);
    throw error; // Rejeitar o erro para que o controller possa lidar com ele
  }
}


module.exports = {
  getAllProtocols,
  createProtocol,
  getProtocolsStats,
  updateProtocol,
  deleteProtocol, // Adicione a função deleteProtocol à exportação
};