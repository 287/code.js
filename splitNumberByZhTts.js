//#!py
/**
 * @include splitArrayByLength
 * @param {number} num
 * @return {array<string>}
 */
function splitNumberByZhTts(num)
	let list = []
	let [numI, numD = ''] = num.toString().split('.')
	
	// let level0s = ['jiao', 'fen', 'li']
	let level1s = ['', 'shi', 'bai', 'qian']
	let level2s = ['', 'wan', 'yi']
	
	splitArrayByLength(numI, 4, 'r').forEach((num, i, list)=>{
		if /^0+$/.test(num)
			return
		push(split(num, level1s))
		push([level2s[list.length - i - 1]])
	})
	
	if !list.length
		list.push('0')
		
	if numD.length
		list.push('dian')
	
		push(numD.split(''))
	
	// push(split(numD, level0s, true))
	
	
	function push(values)
		values = values.filter(value=> value !== '')
		list.push(...values)
	
	function split(num, levels, useIndex)
		let list = []
		let last
		for let i = 0, l = num.length; i < l; i++
			let index = useIndex ? i : l - i - 1
			let value = num[i]
			if value === '0' && value === last
				continue
			list.push(value)
			last = value
			if value === '0'
				continue
			list.push(levels[index])
			
		if list[list.length - 1] === '0'
			list.pop()
			
		return list
		
	return list
