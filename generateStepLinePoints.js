//#!py
/**
 * @desc 由直线两个点获取梯线中的两个点
 * @param {array<number>} p1
 * @param {array<number>} p2
 * @param {string} [mode = 'Z'] - [Z, N, L, 7]]
 * @return {array<array<number>>} 两个点
 */
function generateStepLinePoints(p1, p2, mode = 'Z')
	const points = []
	const pointsLeng = ['L', '7'].includes(mode) ? 1 : 2
	
	const p = [p1, p2]
	const index = ['Z', 'L'].includes(mode) ? 0 : 1
	const anotherIndex = !index >> 0
	
	if pointsLeng === 1
		points.push([p[index][0], p[anotherIndex][1]])
	else
		const middle = (p[1][index] - p[0][index]) / 2 + p[0][index]
		if middle !== 0
			for let i = 0; i < 2; i++
				points[i] = []
				points[i][index] = middle
				points[i][anotherIndex] = p[i][anotherIndex]
			
	return points