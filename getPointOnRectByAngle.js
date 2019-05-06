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