//#!py
/**
 * @include lrKeys tbKeys sizeKeys
 */
function createResizeBorderStyles(borderSize = 1, blockSize = 4, op)
	op = Object.assign({
		border: true,
		borderBlock: true,
		cornerBlock: true,
		rotateBlock: false,
	}, op)
	
	const halfBorderSize = borderSize / 2
	const halfBlockSize = blockSize / 2
	
	const styles = []
	
	// border
	if op.border
		[lrKeys, tbKeys].forEach((keys, i, allKeys)=> {
			const sizeKey = sizeKeys[i]
			const anotherIndex = !i >> 0
			const anotherSizeKey = sizeKeys[anotherIndex]
			const anotherKey = allKeys[anotherIndex][0]
			
			let cursor = `${'wn'[i]}-resize`
			keys.forEach((key)=> {
				styles.push({
					type: 'border',
					[sizeKey]: borderSize,
					[anotherSizeKey]: '100%',
					[key]: -halfBorderSize,
					[anotherKey]: 0,
					cursor,
					cursorAngle: i === 0 ? 0 : 90,
					positions: [key],
				})
			})
		})
	
	// border-block
	if op.borderBlock
		[lrKeys, tbKeys].forEach((keys, i, allKeys)=> {
			let sizeKey = sizeKeys[i]
			let anotherKeys = allKeys[!i >> 0]
			let cursor = `${'wn'[i]}-resize`
			keys.forEach((key)=> {
				styles.push({
					type: 'border-block',
					width: blockSize,
					height: blockSize,
					[key]: -halfBlockSize,
					[anotherKeys[0]]: '50%',
					cursor,
					cursorAngle: i === 0 ? 0 : 90,
					positions: [key],
				})
			})
		})
	
	// corner-block
	if op.cornerBlock
		lrKeys.forEach((lrKey, i)=> {
			tbKeys.forEach((tbKey, i2)=> {
				let cursor = `${['nw', 'sw'][Math.abs(i - i2)]}-resize`
				styles.push({
					type: 'corner-block',
					width: blockSize,
					height: blockSize,
					[lrKey]: -halfBlockSize,
					[tbKey]: -halfBlockSize,
					cursor,
					cursorAngle: Math.abs(i - i2) === 0 ? 45 : 135,
					positions: [lrKey, tbKey],
				})
			})
		})
		
	// rotate-block
	if op.rotateBlock
		styles.push({
			type: 'rotate-block',
			width: blockSize,
			height: blockSize,
			left: '50%',
			top: -blockSize * 4,
			cursor: 'pointer',
		})
	
	return styles