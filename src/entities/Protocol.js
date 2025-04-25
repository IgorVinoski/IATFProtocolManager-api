class Protocol {
    constructor({ id, name, startDate, hormones, bull, notifications, animals = [] }) {
      this.id = id;
      this.name = name;
      this.startDate = startDate;
      this.hormones = hormones;
      this.bull = bull;
      this.notifications = notifications;
      this.animals = animals;
    }
  }
  
  module.exports = Protocol;