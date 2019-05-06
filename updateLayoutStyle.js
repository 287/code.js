//#!py
/**
 * @include xyKeys randomColor
 * @include getObjectByKeys
 * @include isNumber isNumberLike isPercentLike eachObject 
 */
function updateLayoutStyle(conf)
	const {type, style: rect, nodes, styles} = conf

	select type
		case 'x'
		case 'y'
			const xyIndex = xyKeys.indexOf(type)
			const anotherIndex = +!xyIndex
			const ltKey = ltKeys[xyIndex]
			const sizeKey = sizeKeys[xyIndex]
			const wrapSize = rect[sizeKey]
			
			let total = 0
			let notSets = []
			
			eachObject(styles, (style, i)=> {
				let {itemSize: value} = style
				
				if isNumber(value)
					total += value
				else if isNumberLike(value)
					value *= 1
					total += value
				else if isPercentLike(value)
					const percent = value.slice(0, -1) / 100
					value = percent * wrapSize
				else 
					value = null
					notSets.push(i)
					
				style[sizeKey] = value
			})
			
			total = Math.max(wrapSize - total, 0)
			if total > 0 && notSets.length
				const itemSize = total / notSets.length
				
				notSets.forEach((i)=> {
					styles[i][sizeKey] = itemSize
				})
			
			total = 0
			eachObject(styles, (style, i)=> {
				Object.assign(style, {
					[ltKey]: total,
					[ltKeys[anotherIndex]]: 0,
					[sizeKeys[anotherIndex]]: rect[sizeKeys[anotherIndex]],
					// background: randomColor()
				})
				total += style[sizeKey]
			})
			

	return styles
