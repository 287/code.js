//#!py
/**
 * @desc 绘制线条
 * @include generateStepLinePoints generateArrowPoints eachObjectFilter
 * @param {array<number>} op.startPoint
 * @param {array<number>} op.endPoint
 * @param {number} op.stepMode - ["无折线", "横一折", "纵一折", "横二折", "纵二折"]
 * @param {number} op.arrowMode - ["无箭头", "结束箭头", "起始箭头", "单项双箭头", "双向双箭头"]
 * @param {number|boolean} [op.revise] - 修正的角度 - 如果是true则旋转每个角的度数
 */
function generateLinePath(startPoint, endPoint, op)
	const {arrowMode, stepMode} = op || {}
	let path = [
		startPoint,
		endPoint,
	]
	
	if stepMode
		path.splice(1, 0, ...generateStepLinePoints(startPoint, endPoint, ['7', 'L', 'Z', 'N'][stepMode - 1]))
			
	if arrowMode
		const arrowOption = eachObjectFilter(op, (value, key)=> key.startsWith('arrow'))
		const arrowPath = []
		
		if arrowMode !== 2
			//起始点箭头
			arrowPath.push(generateArrowPoints(...path.slice(-2), arrowOption))
		
		if arrowMode !== 1
			//结束点箭头
			if arrowMode === 3
				arrowOption.arrowReverse = !arrowOption.arrowReverse
			arrowPath.push(generateArrowPoints(...path.slice(0, 2).reverse(), arrowOption))
		
		path = [
			path,
			arrowPath,
		]
		
	return path