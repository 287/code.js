//#!py
/**
 * @desc 根据一维表索引和方向键获取相应的二维表中的相应一维表索引(不等宽二维数组)
 * @include findIndexsFromTableArrayByIndex findIndexFromTableArrayByIndexs
 * @param {array<array>} tableArray
 * @param {number} currentIndex
 * @param {string} positionKey
 * @return {number}
 */
function findIndexFromTableArrayByPositionKey(tableArray, index, positionKey)
	if positionKey === 'left'
		if index > 1
			return index - 1
	let [rowIndex, colIndex] = findIndexsFromTableArrayByIndex(tableArray, index)
	
	select positionKey
		case 'left'
			-
				let arr = tableArray[rowIndex]
				if colIndex - 1 >= 0
					colIndex--
				else
					if rowIndex - 1 >= 0
						rowIndex--
					else
						rowIndex = tableArray.length - 1
						
					arr = tableArray[rowIndex]
					colIndex = arr.length - 1
				
		case 'right'
			-
				let arr = tableArray[rowIndex]
				if colIndex + 1 < arr.length
					colIndex++
				else
					if rowIndex + 1 < tableArray.length
						rowIndex++
					else
						rowIndex = 0
					
					colIndex = 0
		case 'top'
		case 'up'
			-
				if rowIndex - 1 >= 0
					rowIndex--
				else
					rowIndex = tableArray.length - 1
				
				const arr = tableArray[rowIndex]
				if colIndex > arr.length - 1
					colIndex = arr.length - 1
					
		case 'bottom'
		case 'down'
			-
				if rowIndex + 1 < tableArray.length
					rowIndex++
				else
					rowIndex = 0
				
				const arr = tableArray[rowIndex]
				if colIndex > arr.length - 1
					colIndex = arr.length - 1
				
	return findIndexFromTableArrayByIndexs(tableArray, [rowIndex, colIndex])