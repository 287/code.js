//#!py
/**
 * @desc 获取圆上点的角度
 * @include toNumber
 * @param {array<number>} origin
 * @param {array<number>} p
 * @return {number}
 */
function getAngleOfPointOnCircle(origin, p)
	let [x, y] = origin.map((v, i)=> p[i] - v)
	if x === 0 && y === 0
		return 0
		
	let angle = toNumber(Math.abs(Math.atan(y / x) / (Math.PI / 180)))
	
	if y > 0
		if x < 0
			angle = 180 - angle
	else
		if x < 0
			angle = 180 + angle
		else
			angle = 360 - angle
		
	return angle