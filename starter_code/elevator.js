const Person = require('./person.js');

class Elevator {
  constructor() {
    this.floor = 0;
    this.direction = 'up'
    this.MAXFLOOR = 6;
    this.intervalId = null;
    this.waiting = [];
    this.passengers = [];
    //this.requests = []; superfluous
  }

  start() {
    let el = this;
    this.intervalId = setInterval(function() {
      el.update();
      el._passengersEnter();
      el._passengersLeave();
      if (el.direction == 'up') {
        el.floorUp();
      } else {
        el.floorDown();
      }
    }, 500);
  }
  stop() {
    clearInterval(this.intervalId);
  }
  update() {
    console.log('Elevator on floor ' + this.floor);
  }
  _passengersEnter() {
    for (let i = 0; i < this.waiting.length; i++) {
      if (this.floor == this.waiting[i].originFloor) {
        this.passengers.push(this.waiting[i]);
        console.log(this.waiting[i].name + 'gets on the elevator');
        this.waiting.splice(i, 1);
      }
    }
  }
  _passengersLeave() {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.floor == this.passengers[i].destinationFloor) {
        console.log(this.passengers[i].name + 'gets off the elevator');
        this.passengers.splice(i, 1);
      }
    }
  }
  floorUp() {
    this.floor++;
    if (this.floor == this.MAXFLOOR) {
      this.direction = 'down';
    }
  }
  floorDown() {
    this.floor--;
    if (this.floor == 0) {
      this.direction = 'up';
    }
  }
  call(Person) {
    this.waiting.push(Person);
  }
  log() {
    console.log('do nothing');
  }
}

module.exports = Elevator;
