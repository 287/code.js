//#!py
/**
 * @include splitOnce trim
 */
function parseAsStatement(str)
	let object, key, step
	[object, step = '1'] = splitOnce(str, ' step ').map(v=> trim(v))
	[object, key = ''] = splitOnce(object, ' as ').map(v=> trim(v))
	
	return {
		object,
		key,
		step,
	}