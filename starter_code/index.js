const Elevator = require('./elevator.js');
const Person = require('./person.js');


var el = new Elevator();

//Testing
var p1 = new Person('andy', 1, 4);
var p2 = new Person('mary', 3, 0);
var p3 = new Person('bob', 4, 2);
el.call(p1);

setTimeout(function() {
  el.call(p2);
}, 4000);

setTimeout(function() {
  el.call(p3);
}, 8000);
