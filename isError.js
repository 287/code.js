//#!py
function isError(o)
	if o != null
		if o.constructor === Error || o.constructor.name.slice(-5) === Error.name
			return true
			
	return false