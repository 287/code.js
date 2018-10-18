//#!py
function getExtname(name, withoutDot)
	var ext = name.match(/.(\.[a-zA-Z0-9]+)$/)

	if ext == null
		ext = ''
	else
		ext = ext[1]
	
		if withoutDot
			ext = ext.slice(1)
		
	return ext