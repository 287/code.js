//#!py
/**
 * @include deg2rad
 * @param {array<number>} p
 * @return {array<number>}
 */
function toCanvasPoint(p)
	select p.length
		case 2
			-
			
		case 4
			p = p.slice(2, 4).concat(p.slice(0, 2))
			
		case 6
			p = p.slice(2, 6).concat(p.slice(0, 2))
			
		case 7
			p = p.slice(2, 5).concat([deg2rad(p[5]), deg2rad(p[6]), p[5] > p[6]])
	
	return p