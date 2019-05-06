//#!py
function mergeTableRowByColIndex(tableNode, colIndex)
	const trs = tableNode.childNodes
	let lastText
	let lastTd
	let repeat
	// let rowCellCount
	for trs as tr, i
		// const tds = tr.childNodes
		// if i === 0
			// for tds as td -
				// rowCellCount += (td.getAttribute('rowspan') || 1) * 1
		const td = getTdByColIndex(tr, colIndex)
		if lastText !== td.innerHTML
			lastText = td.innerHTML
			lastTd = td
			repeat = 1
		else
			repeat++
			const nextTd = td.nextSibling
			if nextTd
				let tdIndex = getTdIndex(nextTd, colIndex + 1)
				nextTd.setAttribute('colindex', tdIndex)
				
			lastTd.setAttribute('rowspan', repeat)
			tr.removeChild(td)
			
	return tableNode
	
	function getTdByColIndex(tr, colIndex)
		let added = 0
		const tds = tr.childNodes
		for tds as td i
			
			let index = getTdIndex(td, i + added)
			added = index - i
			
			if index === colIndex
				return td
				
	function getTdIndex(td, i)
		let index = td.getAttribute('colindex')
		index = index && index * 1 || i
		return index