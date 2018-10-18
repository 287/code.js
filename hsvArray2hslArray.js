//#!py
function hsvArray2hslArray(hsv)
	let [h, s, v] = hsv.map((v, i)=> i > 0 ? v / 100 : v)
	let l
	
	if v === 0
		s = l = v
	else if s === 0
		l = v
	else
		l = (2 - s) * v
		s *= v
		
		s /= l <= 1 ? l : 2 - l
		l /= 2
	
	const hsl = [h, s, l].map((v, i)=> i > 0 ? Math.round(v * 100) : v)
	
	if hsv.length === 4
		hsl.push(hsv[3])

	return hsl