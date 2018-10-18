/**
 * @param {string} type - [*|/|-|+]
 * @param {number} ...
 */
function math(type){
	var i = 2;
	var rs = arguments[1];
	switch(type){ case '+':
		for(; i < arguments.length; i++) rs += arguments[i];
	break;  case '-':
		for(; i < arguments.length; i++) rs -= arguments[i];
	break;  case '*':
		for(; i < arguments.length; i++) rs *= arguments[i];
	break;  case '/':
		for(; i < arguments.length; i++) rs /= arguments[i];
	}
	return rs.toFixed(6) * 1;
}

