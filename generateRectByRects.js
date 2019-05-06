//#!py
/**
 * @desc 获取多个矩形最外层的矩形
 * @include minMaxKeys
 * @include generateTwoPointsByRect generateRectByTwoPoints
 * @param {object} rect
 * @return {object}
 */
function generateRectByRects(rects)
	const rectPoints = rects.map((rect)=> generateTwoPointsByRect(rect))
	const points = rectPoints.reduce((prev, points)=> {
		for let i = 0; i < 2; i++
			let key = minMaxKeys[i]
			for let j = 0; j < 2; j++
				prev[i][j] = Math[key](prev[i][j], points[i][j])
		return prev
	})
	return generateRectByTwoPoints(...points)