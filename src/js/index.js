// import * as $ from 'jquery'; // при таком ипорте не подтягивается имя чанка
import avg from './some.js';
import merge from './some.js';

import '../styles/main.sass';

// $('.title').html('Some Dynamic Text') 

require.ensure ([], function (require) {
	var $ = require ("jquery")
	// Что-то классное с jQuery. $
	$('.title').html('Some Dynamic Text')
}, "jQuery" // это будет передано в шаблон веб-пакета под [имя] и может использоваться с chunkFileName
);

// console.log(avg(1,5,10,15));

function func(surname, name, ...rest) {
	alert(surname); //выведет 'Иванов'
	alert(name); //выведет 'Иван'
	alert(rest); //выведет ['20 лет', 'женат', 'без вп']
}

// console.log(func('Иванов', 'Иван', '20 лет', 'холост', 'без вп'))

// alert('Page is loaded!')


// console.log(merge({a:1},{b:2}))