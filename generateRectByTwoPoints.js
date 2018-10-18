//#!py
/**
 * @desc 通过左上角 及 右下角的两个点坐标生成rect对象
 * @param {array<number>} p1
 * @param {array<number>} p2
 * @return {object}
 */
function generateRectByTwoPoints(p1, p2)
	const ltKeys = ['left', 'top']
	const sizeKeys = ['width', 'height']
	const rect = {}
	for let i = 0; i < 2; i++
		rect[sizeKeys[i]] = Math.abs(p1[i] - p2[i])
		rect[ltKeys[i]] = Math.min(p1[i], p2[i])
	return rect