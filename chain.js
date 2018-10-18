/**
 * chain(value, [parse, compile]) -> compile(parse(value))
 * @param {*} value
 * @param {array<function>} methods
 */
function chain(value, methods){
	if(methods && methods.length > 0){
		for(var i = 0; i < methods.length; i++) value = methods[i](value);
	}
	return value;
}