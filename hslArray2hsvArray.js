//#!py
function hslArray2hsvArray(hsl)
	let [h, s, l] = hsl.map((v, i)=> i > 0 ? v / 100 : v)
	let v
	
    l *= 2
    s *= l <= 1 ? l : 2 - l
    v = (l + s) / 2
    s = 2 * s / (l + s)
	
	const hsv = [h, s, v].map((v, i)=> i > 0 ? Math.round(v * 100) : v)
	
	if hsl.length === 4
		hsv.push(hsl[3])

	return hsv