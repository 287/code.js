//#!py
/**
 * @param {array<array<number>>} indexsArray
 * @param {number} [fillValue = -1] - 用于补齐长度的值
 * @return {array<number>}
 */
function getSortedIndexsByIndexs(indexsArray, fillValue = -1)
	indexsArray = indexsArray.map(indexs=> indexs.slice(0))
	const maxLength = indexsArray.reduce((max, arr)=> max = Math.max(max, arr.length), 0)
	
	for indexsArray as indexs -
		for maxLength - indexs.length as i
			indexs.push(fillValue)
			
	const indexsArr = indexsArray.slice(0)
	
	sortByIndex(indexsArr)
	
	return indexsArr.map(indexs=> indexsArray.indexOf(indexs))
	
	
	function sortByIndex(indexsArr, index = 0, sliceStarts = 0, sliceEnds = indexsArr.length)
		if sliceEnds - sliceStarts < 2
			return
			
		const sortedArr = indexsArr.slice(sliceStarts, sliceEnds).sort((prev, next)=> prev[index] - next[index])
		
		const repeats = []
		let starts = -1, ends, lastValue
		
		for sortedArr as indexs i
			let value = indexs[index]
			if value === undefined 
				value = fillValue
			
			if value === lastValue
				repeats
				if starts === -1
					starts = i - 1
			else
				ends = i
				
				if starts !== -1
					repeats.push([starts, ends])
					starts = -1
				
			lastValue = value
		
		if repeats.length === 0
			if starts === 0
				repeats.push([starts])
		else
			repeats.push([ends])
		
		if index < maxLength - 1
			for repeats as arr -
				sortByIndex(sortedArr, index + 1, ...arr)
				
		indexsArr.splice(sliceStarts, sliceEnds - sliceStarts, ...sortedArr)