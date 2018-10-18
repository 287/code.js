//#!py
/**
 * @desc 获取点在矩形边框上的位置-角有两个位置
 * @include generateTwoPointsByRect lrKeys tbKeys
 * @param {object} rect
 * @param {number} rect.left
 * @param {number} rect.top
 * @param {number} rect.width
 * @param {number} rect.height
 * @param {array<number>} p - point
 * @param {number} [size = 2] - border size
 * @return {array<string>}
 */
function getPositionsFromRectByPoint(rect, p, size = 2)
	const halfSize = size / 2
	// 内矩形的对角线的两点
	const points = generateTwoPointsByRect(rect).map((p, i)=> p.map(v=> v + halfSize * (i == 1 ? -1 : 1)))
	
	const positions = []
	
	for let i = 0; i < 2; i++
		if i === 1 && !positions[0]
			break
		[lrKeys, tbKeys].forEach((keys, index, allKeys) => {
			if i === 1
				if !keys.includes(positions[0])
					return
			const anotherIndex = !i ? index : !index >> 0
			keys = allKeys[anotherIndex]
			
			if p[anotherIndex] <= points[0][anotherIndex]
				positions[i] = keys[0]
			else if p[anotherIndex] >= points[1][anotherIndex]
				positions[i] = keys[1]
		})
		
	return positions