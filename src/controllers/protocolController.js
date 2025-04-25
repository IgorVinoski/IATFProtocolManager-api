const protocolUseCases = require('../usecases/protocolUseCases');

async function index(req, res) {
  const protocols = await protocolUseCases.getAllProtocols();
  res.json(protocols);
}


async function create(req, res) {
  const newProtocol = await protocolUseCases.createProtocol(req.body);
  res.status(201).json(newProtocol);
}

async function update(req, res) {
  const { id } = req.params;
  const updatedProtocol = await protocolUseCases.updateProtocol(id, req.body);
  if (updatedProtocol) {
    res.json(updatedProtocol);
  } else {
    res.status(404).json({ message: 'Protocolo não encontrado' });
  }
}

async function stats(req, res) {
  const protocolsStats = await protocolUseCases.getProtocolsStats();
  res.json(protocolsStats);
}

async function destroy(req, res) {
  const { id } = req.params;
  const deleted = await protocolUseCases.deleteProtocol(id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Protocolo não encontrado' });
  }
}

module.exports = {
  index,
  create,
  update,
  stats,
  destroy,
};