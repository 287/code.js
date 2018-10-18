//#!py
/**
 * eg1: pipe(value, [compile, parse, build]) === build(parse(compile(value)));
 * eg1: pipe([compile, parse, build]) === function(value){return build(parse(compile(value)))};
 * eg2: pipe(value, [[compile, ['&', {conf: 1}]], parse, [build, [1, '&']]]) === build(1, parse(compile(value, {conf: 1})));
 * 
 * @include isFunction, isArray
 * @param {*} value
 * @param {array<function|array>} methods
 * @return {any}
 */
function pipe(value, methods)
	if isFunction(methods)
		methods = toArray(arguments, 1)
	
	for let i = 0; i < methods.length; i++
		value = methods[i](value)
		
	return value
}