//#!py
function isPromise(o)
	return o && o.constructor.name === 'Promise' || false