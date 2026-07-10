import $ from 'jquery';
import avg from './some.js';
import merge from './some.js';


// import './css/main.css';

import './sass/main.sass';

// import './images/pop_6.png'

$('.title').html('Some Text')

// console.log(avg(1,5,10,15));

function func(surname, name, ...rest) {
	alert(surname); //выведет 'Иванов'
	alert(name); //выведет 'Иван'
	alert(rest); //выведет ['20 лет', 'женат', 'без вп']
}

// console.log(func('Иванов', 'Иван', '20 лет', 'холост', 'без вп'))

// console.log('12345')

alert('Page is loaded!')

// console.log(merge({a:1},{b:2}))