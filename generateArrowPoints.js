//#!py
/**
 * @desc 由直线两个点获取箭头中的点
 * @include getAngleOfPointOnCircle getPointOnCircle parseBooleanToSign
 * @param {array<number>} p1 - start point
 * @param {array<number>} p2 - end point
 * @param {object} [op = {}] - 参数
 * @param {boolean} [op.arrowReverse = false] - 反向箭头
 * @param {number} [op.arrowSize = 15] - 箭边长度
 * @param {number} [op.arrowAngle = 80] - 箭头张合角度
 * @param {number} [op.arrowType = 1] - 1：简单模式 2：增加闭合 3：增加回折点
 * @param {number} [op.arrowROffset = 2] - 回折点偏移量
 * @return {array<array<number>>}
 */
function generateArrowPoints(p1, p2, op)
	op = Object.assign({
		arrowSize: 15,
		arrowAngle: 80,
		arrowReverse: false,
		arrowType: 3,
		arrowROffset: 2
	}, op)
	
	let angle = getAngleOfPointOnCircle(p2, p1)
	let points = []
	for let i = 0; i < 2; i++
		points[i] = getPointOnCircle(p2, op.arrowSize, angle + parseBooleanToSign(i) * op.arrowAngle / 2 + op.arrowReverse * 180)
	points.splice(1, 0, p2)
	
	if op.arrowType === 3
		points.push(getPointOnCircle(p2, op.arrowROffset, angle))
		
	if op.arrowType >= 2
		points.push(points[0])
		
	return points