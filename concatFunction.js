//#!py
/**
 * @include pipe
 * @param {...function} methods
 * @return {any}
 */
function concatFunction(...methods)
	return function(value)
		return pipe(value, ...methods)