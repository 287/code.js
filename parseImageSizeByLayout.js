//#!py
/**
 * @desc 根据布局方式计算image用来显示时的偏移和尺寸
 * @param {object} [op]
 * @param {array<number>} op.showSize - img的原始尺寸
 * @param {array<number>} op.wrapSize - 外框尺寸
 * @param {string} [op.layoutType = 'fill'] ['fill', 'fit', 'cut', 'repeat', 'repeat-x', 'repeat-y']
 * @param {array<number>} [op.showSize] - 图片展示尺寸-即repeat时显示的单个展示尺寸
 * @return {array<number>}
 */
function parseImageSizeByLayout(imgSize, wrapSize, layoutType = 'fill', showSize)
	let offset
	let size

	select layoutType
		case 'fit'
		case 'cut'
			if !showSize
				const ratios = wrapSize.map((v, i)=> v / imgSize[i])
				const mathMethod = layoutType === 'fit' ? Math.min : Math.max
				const ratio = mathMethod(...ratios)
				showSize = imgSize.map(v=> v * ratio)
			
			size = showSize
			offset = wrapSize.map((v, i)=> (v - showSize[i]) / 2)
			
		case 'repeat'
		case 'repeat-x'
		case 'repeat-y'
			offset = [0, 0]
			size = showSize || imgSize
			
		case 'fill'
		default
			offset = [0, 0]
			size = wrapSize
			
	return [offset, size]