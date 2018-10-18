//#!py
function rgbArray2hslArray(rgb)
	const [r, g, b] = rgb.map(v=> v / 255)
	let max, min, diff, add, hue, lum, sat
	
	max = Math.max(r, g, b)
	min = Math.min(r, g, b)
	
	diff = max - min
	add = max + min
	
	hue = g === max ? 60 * (b - r) / diff + 120 : 60 * (r - g) / diff + 240
	hue = r === max ? (60 * (g - b) / diff + 360) % 360 : hue
	hue = min === max ? 0 : hue
	
	
	lum = 0.5 * add
	sat = lum <= 0.5 ? diff / add : diff / (2 - add)
	sat = lum === 1 ? 1 : sat
	sat = lum === 0 ? 0 : sat
	
	const hsl = [hue, sat, lum].map((v, i)=> Math.round(i === 0 ? v : v * 100))
	
	if hsl[2] === 100
		hsl[1] = 0
		
	if rgb[3] != null
		hsl.push(rgb[3])
	
	return hsl