class Person {
  constructor(name, originFloor, destinationFloor) {
    this.name = name;
    this.originFloor = originFloor;
    this.destinationFloor = destinationFloor;
    if (originFloor < destinationFloor) {
      this.direction = 'up';
    } else {
      this.direction = 'down';
    }
  }
}

module.exports = Person;
