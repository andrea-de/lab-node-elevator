const Elevator = require('./elevator.js');
const Person = require('./person.js');

var el = new Elevator();
var p1 = new Person('andy', 1, 4);
var p2 = new Person('mary', 3, 0);
el.call(p1);
el.call(p2);

el.start();
setTimeout(function() {
  if (el.passengers.length == 0 && el.waiting.length == 0) {
    el.stop();
  }
}, 10000);
