//#!py
function toSvgPoint(p)
	select p.length
		case 2
			-
			
		case 4
			p = p.slice(2, 4).concat(p.slice(0, 2))
			
		case 6
			p = p.slice(2, 6).concat(p.slice(0, 2))
			
		case 7
			const value = (p[6] - p[5]) % 360
			p = [p[4], p[4], 0, (Math.abs(value) > 180) >> 0, (value > 0) >> 0, p[0], p[1]]
	
	return p