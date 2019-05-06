//#!py
function toBetween(value, min, max)
	if min != null
		value = Math.max(value, min)
	if max != null
		value = Math.min(value, max)
	return value