class Animal {
  constructor({ id, name, tagNumber, breed, weight, age, reproductiveHistory, imageUrl }) {
    this.id = id;
    this.name = name;
    this.tagNumber = tagNumber;
    this.breed = breed;
    this.weight = weight;
    this.age = age;
    this.reproductiveHistory = reproductiveHistory;
    this.imageUrl = imageUrl;
  }
}

module.exports = Animal;