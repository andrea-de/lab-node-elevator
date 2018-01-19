const Person = require('./person.js');

class Elevator {
  constructor() {
    this.floor = 0;
    this.direction = 'up'
    this.MAXFLOOR = 6;
    this.intervalId = null;
    this.waiting = [];
    this.passengers = [];
    this.active = false;
    //this.requests = []; superfluous
  }

  call(Person) {
    if (this.active == false) {
      var el = this;
      el.active == true;
      console.log('Elevator Active');
      el.update();
      this.intervalId = setInterval(function() {
        el.movement();
        el.stop();
      }, 500);
    }
    this.waiting.push(Person);
  }
  stop() {
    if (this.passengers.length + this.waiting.length == 0) {
      this.active = false;
      console.log('Elevator Inactive');
      clearInterval(this.intervalId);
    }
  }
  update() {
    console.log('Elevator on floor ' + this.floor);
  }
  _passengersEnter() {
    for (let i = 0; i < this.waiting.length; i++) {
      if (this.floor == this.waiting[i].originFloor) {
        this.passengers.push(this.waiting[i]);
        console.log(this.waiting[i].name + ' enters the elevator');
        this.waiting.splice(i, 1);
      }
    }
  }
  _passengersLeave() {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.floor == this.passengers[i].destinationFloor) {
        console.log(this.passengers[i].name + ' leaves the elevator');
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
  movement() {
    if (this.passengers.length == 0 && this.waiting.length != 0) {
      if (this.floor < this.waiting[0].originFloor) {
        this.direction = 'up';
      } else {
        this.direction = 'down';
      }
    }
    if (this.direction == 'up') {
      this.floorUp();
      this.update();
      this.checkFloor('up')
    } else {
      this.floorDown();
      this.update();
      this.checkFloor('down');
    }
  }
  checkFloor(direction) {
    let stopped = false;
    for (let i = 0; i < this.waiting.length; i++) {
      if (this.floor == this.waiting[i].originFloor) {
        if (this.waiting[i].direction == direction) {
          stopped = true;
        } else if (this.waiting.length == 1) {
          stopped = true;
          this.direction = this.waiting[i].direction;
        }
      }
    }
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.floor == this.passengers[i].destinationFloor) {
        stopped = true;
      }
    }
    if (stopped) {
      //this.update();
      this._passengersEnter();
      this._passengersLeave();
    }
  }
}

module.exports = Elevator;
