//#!py
/**
 * @desc 获取圆上点的角度
 * @include fixNumber
 * @param {array<number>} p
 * @param {array<number>} [origin]
 * @return {number}
 */
function getAngleOfPoint(p, origin)
	if origin
		p = origin.map((v, i)=> p[i] - v)
		
	let angle = 0
	
	if !p.every(v=> v === 0)
		const [x, y] = p
	
		angle = fixNumber(Math.abs(Math.atan(y / x) / (Math.PI / 180)))
		
		if y > 0
			if x < 0
				angle = 180 - angle
		else
			if x < 0
				angle = 180 + angle
			else
				angle = 360 - angle
		
	return angle