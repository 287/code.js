//#!py
/**
 * eg1: pipe(value, [compile, parse, build]) === build(parse(compile(value)));
 * eg1: pipe([compile, parse, build]) === function(value){return build(parse(compile(value)))};
 * eg2: pipe(value, [[compile, ['&', {conf: 1}]], parse, [build, [1, '&']]]) === build(1, parse(compile(value, {conf: 1})));
 * 
 * @param {*} value
 * @param {...function} methods
 * @return {any}
 */
function pipe(value, ...methods)
	for methods as method, i
		value = method(value)
		
	return value