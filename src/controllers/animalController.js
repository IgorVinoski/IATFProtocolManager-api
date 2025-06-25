const animalUseCases = require('../usecases/animalUseCases');

async function index(req, res) {
  const animals = await animalUseCases.getAllAnimals();
  res.json(animals);
}

async function create(req, res) {
  const newAnimal = await animalUseCases.createAnimal(req.body);
  res.status(201).json(newAnimal);
}

async function update(req, res) {
  const { id } = req.params;
  const updatedAnimal = await animalUseCases.updateAnimal(id, req.body);
  if (updatedAnimal) {
    res.json(updatedAnimal);
  } else {
    res.status(404).json({ message: 'Animal não encontrado' });
  }
}

async function destroy(req, res) {
  const { id } = req.params;
  const deleted = await animalUseCases.deleteAnimal(id);
  if (deleted) {
    res.status(204).send(); 
  } else {
    res.status(404).json({ message: 'Animal não encontrado' });
  }
}

async function stats(req, res) {
  const stats = await animalUseCases.getAnimalsStats();
  res.json(stats);
}

module.exports = {
  index,
  create,
  update,
  destroy, 
  stats
};