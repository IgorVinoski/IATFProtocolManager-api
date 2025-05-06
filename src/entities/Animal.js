class Animal {
  constructor({ id, name, tag_number, breed, weight, age, reproductiveHistory, imageUrl }) {
    this.id = id;
    this.name = name;
    this.tagNumber = tag_number;
    this.breed = breed;
    this.weight = weight;
    this.age = age;
    this.reproductiveHistory = reproductiveHistory;
    this.imageUrl = imageUrl;
  }
}

module.exports = Animal;