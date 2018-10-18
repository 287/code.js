//#!py
/**
 * @include 
 */
function hslArray2rgbArray(hsl)
	const [h, s, l] = hsl.map((v, i)=> i > 0 ? v / 100 : v / 360)
	let r, g, b
	
	if s === 0
		r = g = b = l
	else
		let q = l < 0.5 ? l * (1 + s) : l + s - l * s
		let p = 2 * l - q
		
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	
	const rgb = [r, g, b].map(v=> Math.round(v * 255))
	
	if hsl[3] != null
		rgb.push(hsl[3])
	
	return rgb
		
	function hue2rgb(p, q, t)
		if t < 0
			t += 1
		if t > 1
			t -= 1
			
		let rs = p
		
		if t < 1 / 6
			rs = p + (q - p) * 6 * t
		else if t < 1 / 2
			rs = q
		else if t < 2 / 3
			rs = p + (q - p) * (2 / 3 - t) * 6
		
		return rs