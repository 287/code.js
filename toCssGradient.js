//#!py
/**
 * @include gradientKeys isNumber isArray
 * @param {array<number>|number} position - must be 4 or 6 length Array or rotate angle
 * @param {array<array<color, percent>>} colorOffsets
 * @return {element}
 */
function toCssGradient(type, position, colorOffsets)
	if !gradientKeys.includes(type)
		type = gradientKeys[0]
		
	if !colorOffsets && isArray(position)
		colorOffsets = position
		position = null
	
	const list = []
	
	if type === gradientKeys[0]
		if position == null
			position = 0
			
		if isNumber(position)
			type = gradientKeys[0]
			list.push(position + 90 + 'deg')
	else
		if position
			if isNumber(position)
				position = [.5, .5, position]
			else if isArray(position)
				// if position.length === 2
					// position = position.slice(0)
					// position.push(.5)
					
				list.push('at ' + position.slice(0, 2).map(v=> v * 100 + '%').join(' '))

	colorOffsets.forEach((colorOffset, i)=> {
		let str = colorOffset
		if isArray(colorOffset)
			str = colorOffset[0]
			if colorOffset[1] == null
				str += ' ' + Math.round(1 / (colorOffsets.length - 1) * i * 100) + '%'
			else
				if colorOffset[1] <= 1
					str += ' ' + Math.round(colorOffset[1] * 100) + '%'
				else
					str += colorOffset[1]
		list.push(str)
	})
	
	return `${type}-gradient(${list.join(', ')})`