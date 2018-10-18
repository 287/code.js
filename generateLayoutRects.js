//#!py
/**
 * @include sizeKeys xyKeys ltKeys
 * @include eachNumber
 * @include getObjectByKeys
 * @include isNumber isNumberLike isPercentLike eachObject 
 * @param {string} type - [gird, x, y]
 */
function generateLayoutRects(wrapRect, rects, op)
	const settings = []
	const {layout, align, baseline} = op

	select layout
		// 横排模式
		case 'x'
		// 竖排模式
		case 'y'
			// justify
			// 另一侧 填充 对齐
			const index = xyKeys.indexOf(layout)
			const anothorIndex = !index >> 0
			const ltKey = ltKeys[index]
			const sizeKey = sizeKeys[index]
			
			const totalSize = rects.reduce((total, rect)=> total + rect[sizeKey], 0)
			if totalSize === 0
				const itemSize = totalSize / rects.length
				// rects.forEach((rect, i)=> {
					// const setting = {
						// [ltKey]: itemSize * i,
						// [sizeKey]: itemSize,
					// }
					// if 
					// settings[i] = 
					// return {
				// }})
				settings = rects.map(rect=> {return {
					[ltKey]: itemSize * i,
					[sizeKey]: itemSize,
				}})
			else
				// let sizeLast
				// settings = 
				// rects.forEach((rect, i)=> {
					// const setting = {
						// [ltKey]: itemSize * i,
						// [sizeKey]: itemSize,
					// }
					// if 
					// settings[i]
					// return {
				// }})
				
				
			
			// rects.map((rect)=> {
				// sizeTotal += rect[sizeKey]
				// rects.
			// })
		
		// 栅格模式
		case 'grid'
			const {gridSizeX = 1, gridSizeY = 1} = op
			const gridSize = [gridSizeX, gridSizeY]
			const itemSizes = sizeKeys.map((key, i)=> wrapRect[key] / gridSize[i])
			
			rects.forEach((rect, i)=> {
				const x = i % gridSize[0]
				const y = i / gridSize[0] >> 0
				settings[i] = {
					left: itemSizes[0] * x,
					top: itemSizes[1] * y,
					width: itemSizes[0],
					height: itemSizes[1],
				}
			})
		
		// 堆叠模式
		case 'pile'
			for let i = 0, l = rects.length; i < l; i++
				settings[i] = {
					left: 0,
					top: 0,
					width: wrapRect.width,
					height: wrapRect.height,
				}
		
	return settings
