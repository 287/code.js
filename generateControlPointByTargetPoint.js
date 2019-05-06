//#!py
/**
 * @desc 由经过的目标点生成贝塞尔曲线的控制点
 * @include generateMiddlePoint
 * @param {array<number>} startsPoint
 * @param {array<number>} endsPoint
 * @param {array<number>} targetPoint
 * @return {array<number>}
 */
function generateControlPointByTargetPoint(startsPoint, endsPoint, targetPoint)
	const middlePoint = generateMiddlePoint(startsPoint, endsPoint)
	return generateMiddlePoint(middlePoint, targetPoint, 2)