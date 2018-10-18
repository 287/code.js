//#!py
/**
 * @desc 根据布局属性计算尺寸
 * @param {array<number>} innerRectSize
 * @param {array<number>} outerRectSize
 * @param {string} [type = 'fit']
 * @return {array<number>}
 */
function parseLayoutSize(innerRectSize, outerRectSize, type = 'fit')
	let size
	switch type
		case 'fit'
		case 'cut'
			if !op.imgSize
				let ratios = outerRectSize.map((v, i)=> v / innerRectSize[i])
				let ratio = (type === 'fit' ? Math.min : Math.max)(...ratios)
				size = innerRectSize.map(v=> v * ratio)
			break
			
		case 'fill'
			size = outerRectSize
			break
			
		default
			size = innerRectSize
			break
			
	return size