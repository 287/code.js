//#!py
/**
 * @include 
 */
function tableArray2divString(tableArray, op)
	const {parseValue} = op || {}
	const array = []
	for tableArray as line, lineIndex
		const arr = []
		for line as value, i
			if parseValue
				value = parseValue(value, i, line)
			arr.push(`<div class="table-td" td-index="${i}">${value}</div>`)
		array.push(`<div class="table-tr" tr-index="${lineIndex}">${arr.join('')}</div>`)
	
	return `<div class="table-wrap">${array.join('')}</div>`