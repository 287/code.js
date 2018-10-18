//#!py
/**
 * @param {array<number>} p - [lng, lat]
 * @return {array<number>}
 */
function parsePointByMercator(p)
	let [lng, lat] = p
	
	lat = Math.log(Math.tan(((lat - 0) / 90 + 1) * Math.PI / 4)) * 180 / Math.PI
	
	p = [lng, -lat]
		
	return p