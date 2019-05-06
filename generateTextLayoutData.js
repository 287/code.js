//#!py
/**
 * @include parsePaddingValue
 * @param {object} method
 * @param {function} method.getTextWidth
 * @param {function} method.splitTextByWidth
 */
function generateTextLayoutData(text, op, method)
	let {fontSize = 12, lineHeight, width, height, align, baseline, nowrap, overflow, padding} = op
	const {getTextWidth, splitTextByWidth} = method
	const ellipsisText = '...'
	let texts = []
	let lines = []
	let widths = []
	let offsets = []
	let offsetLeft = 0
	let offsetTop = 0

	if padding
		padding = parsePaddingValue(padding)
		
		width -= padding[1] + padding[3]
		offsetLeft += padding[1]
		
		height -= padding[0] + padding[2]
		offsetTop += padding[0]
		
	lineHeight = lineHeight || fontSize
		
	let needEllipsis
	let allowEllipsis = overflow === 'ellipsis'
	let allowSlice = overflow === 'hidden' || allowEllipsis
		
	// 不换行
		// 截断
		// 不截断
	// 换行
		// 截断
	// nowrap === true
		// allowSlice === true
			// limit one line
		// else
			// -
	// else
		// allowSlice === true
			// limit line
		// else
			// not limit
	
	// !allowSlice &&  nowrap
	// allowSlice || !nowrap
		
	if allowSlice || !nowrap
		if width <= 0 || height <= 0 || fontSize <= 0 || lineHeight <= 0
			text = ''
		else if width < fontSize * .5 || height < lineHeight * .75
			text = ''
		else if height < lineHeight
			text = ellipsisText
		else
			let maxLen = nowrap ? 1 : height / lineHeight >> 0
			let textWidth = getTextWidth(text)
		
			if textWidth > width
				lines = splitTextByWidth(text, width)
				
				if allowEllipsis && maxLen < lines.length
					needEllipsis = true
				
				if !allowSlice
					maxLen = undefined
				texts = lines.slice(0, maxLen)
					
			
	if texts.length === 0
		texts[0] = text
		
	if needEllipsis
		let lastText = texts[texts.length - 1]
		
		if width - getTextWidth(lastText) >= getTextWidth(ellipsisText)
			lastText += ellipsisText
		else
			let sliceLength = lastText.slice(-1).charCodeAt(0) < 255 ? 2 : 1
			lastText = lastText.slice(0, -sliceLength) + ellipsisText
			
		texts[texts.length - 1] = lastText
		
	
	widths = texts.map(text=> getTextWidth(text))
	
	// apply align
	offsets = widths.map((lineWidth, i)=>{
		let offset = offsetLeft
		let sep = width - lineWidth
		select align
			case 'right'
				offset += sep
				
			case 'center'
				offset += sep / 2
			
			default
				offset += 0
		return offset
	})
	
	// apply baseline
	-
		// let offset = 0
		// let fontRealSize = fontFamilySize.height * style.fontSize
		// svg 默认向上偏移字号的15%，所以把他偏移回来
		// if context === 'svg'
			// offset += style.fontSize * .85
			// offset -= style.fontSize * .15
			// offset += fontRealSize
			
		// offset -= 
			
		// if style.baseline !== 'top'
			// let textHeight = lineHeight * this.texts.length
			// let sep = style.height - textHeight
	if lineHeight !== fontSize
		select baseline
			case 'top'
				-
			case 'middle'
				offsetTop += (lineHeight - fontSize) / 2
				
			case 'bottom'
				offsetTop += lineHeight - fontSize
		
	return {
		texts,
		widths,
		offsets,
		offsetTop,
		lines,
	}