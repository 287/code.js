//#!py
/**
 * @desc 由贝塞尔曲线的控制点生成经过的目标点
 * @include generateMiddlePoint
 * @param {array<number>} startsPoint
 * @param {array<number>} endsPoint
 * @param {array<number>} controlPoint
 * @return {array<number>}
 */
function generateTargetPointByControlPoint(startsPoint, endsPoint, controlPoint)
	const middlePoint = generateMiddlePoint(startsPoint, endsPoint)
	return generateMiddlePoint(middlePoint, controlPoint)