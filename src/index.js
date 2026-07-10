import $ from 'jquery';
import avg from './some.js';
import merge from './some.js';

$('.title').html('Some Text')

console.log(avg(1,5,10,15));

// function func(surname, name, ...rest) {
// 	alert(surname); //выведет 'Иванов'
// 	alert(name); //выведет 'Иван'
// 	alert(rest); //выведет ['20 лет', 'женат', 'без вп']
// }

// console.log(func('Иванов', 'Иван', '20 лет', 'женат', 'без вп', '2'))

console.log(merge({a:1},{b:2}))