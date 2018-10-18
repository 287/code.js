//#!py
/**
 * @desc 通过基于中心点的旋转角获取矩形上的点
 * @include fixNumber
 * @param {array<number>} rectSize
 * @param {number} angle - 0度是xy轴中的x轴
 * @return {array<number>}
 */
function getPointOnRectByAngle(rectSize, angle)
	angle = angle % 360
	if angle < 0
		angle += 360
		
	const section8Index = (Math.floor(angle / 45) - 3 + 8) % 8
	const section4Index = Math.floor(section8Index / 2)
	const section2Index = Math.floor(section4Index / 2)
	const xyIndex = section4Index % 2
	
	const point = []
	point[xyIndex] = section2Index === 0 ? 0 : rectSize[xyIndex]
	
	let angleOffset = angle % 45 
	if section8Index % 2 === 0
		angleOffset = 45 - angleOffset
		
	const half = rectSize[1 - xyIndex] / 2
	let offset = 0
	if angleOffset > 0
		offset = Math.tan(angleOffset * Math.PI / 180) * half
		offset = fixNumber(offset)
		
	point[1 - xyIndex] = half + offset * ([0, 3, 5, 6].includes(section8Index) ? 1 : -1)
	
	return point
	
	
	
	const halfIndex = Math.floor(index / 2) % 2 === 0 ? 1 : 0
	// point[halfIndex] = 
	// const half = 
		
	const halfSize = rectSize.map(v=> v / 2)
	if index
	
	if angle >= 0 && angle <= 45
	
	
	select index
		
	
	
	if angle >= 0 && angle <= 45
		// angle = 
	
	
		
	const p = [0, 0]
	const index = Math.floor(angle / 90) % 4
	angle = angle % 90
	
	if angle === 0
		select index
			case 0
				p[0] = r
			case 1
				p[1] = r
			case 2
				p[0] = r * -1
			case 3
				p[1] = r * -1
	else
		angle = index % 2 === 1 ? 90 - angle : angle
	
		p[1] = Math.sin(Math.PI / 180 * angle) * r
		p[0] = Math.sqrt(Math.pow(r, 2) - Math.pow(p[1], 2))
		
		select index
			case 1
				p[0] *= -1
			case 2
				p[0] *= -1
				p[1] *= -1
			case 3
				p[1] *= -1
	
	
	p.forEach((v, i)=> {
		v += origin[i]
		if round
			v = Math.round(v)
		p[i] = v
	})
	
	return p

console.log(getPointOnRectByAngle([200, 100], 0))