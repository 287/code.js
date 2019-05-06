//#!py
/**
 * @desc xlsx module workbook to array
 * @param {object} workbook
 * @return {array}
 */
function workbook2object(workbook)
	// const workbook = xlsx.read(excelData)
	const {Sheets: sheets} = workbook
	
	const rs = {}

	for sheets as sheet sheetName i
		const sheet = sheets[sheetName]
		delete sheets[sheetName]
		
		unmergeSheet(sheet)
		
		const array = sheet2array(sheet)
		if array.length === 1 && array[0].length === 0
			array.pop()
		
		rs[sheetName] = array
	
	return rs

	function sheet2array(sheet)
		const array = []
		const ref = sheet['!ref']
		const [colIndexs, rowIndexs] = refString2indexs(ref)
		
		for rowIndexs[0] to rowIndexs[1] + 1 as rowIndex
			array[rowIndex] = Array(colIndexs[1] - colIndexs[0] + 1).fill(undefined)
			for colIndexs[0] to colIndexs[1] + 1 as colIndex
				const cellKey = indexs2cellKey(colIndex, rowIndex)
				const cell = sheet[cellKey]
				
				if cell
					array[rowIndex][colIndex] = cell.v
					
		return array
		
	function unmergeSheet(sheet)
		const merges = sheet['!merges']
		if merges
			for merges as obj -
			
				const cellKey = object2cellKey(obj.s)
				const cell = sheet[cellKey]
				
				const [colIndexs, rowIndexs] = mergeObject2indexs(obj)
				
				for rowIndexs[0] to rowIndexs[1] + 1 as rowIndex
					for colIndexs[0] to colIndexs[1] + 1 as colIndex
						const cellKey = indexs2cellKey(colIndex, rowIndex)
						sheet[cellKey] = cell
		return sheet

	function refString2indexs(ref)
		const refIndexs = ref.split(':').map(v=> {
			const colKey = v.match(/[a-z]+/i)[0]
			const rowKey = v.slice(colKey.length)
			return [char2index(colKey), rowKey - 1]
		})
		/**
		 * @include row2col
		 */
		return row2col(refIndexs)
		
	function mergeObject2indexs(obj)
		return [
			[obj.s.c, obj.e.c],
			[obj.s.r, obj.e.r],
		]

	function object2cellKey(obj)
		return indexs2cellKey(obj.c, obj.r)
		
	function indexs2cellKey(colIndex, rowIndex)
		return `${index2char(colIndex)}${rowIndex + 1}`

	function index2char(index)
		return String.fromCharCode(65 + index)
		
	function char2index(chr)
		let index = chr.charCodeAt(0)
		if index >= 97
			index -= 97
		else
			index -= 65
		return index