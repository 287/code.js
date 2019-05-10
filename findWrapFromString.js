//#!py
/**
 * 替换掉字符串中以单或双引号包裹起来的部分
 * @param {string} str
 * @param {array<string|array<string>>} wraps
 * @param {function} onfind
 * @return {undefined}
 */
function findWrapFromString(string, wraps, start = 0, onfind)
	let ends
	for start to string as chr i
		if ends
			if chr === ends[0]
				if string.slice(i, i + ends.length) === ends
					onfind('end', ends, i)
					i += ends.length - 1
					ends = null
					
		else
			for wraps as wrap -
				const starts = wrap[0]
				
				if chr === starts[0]
					if string.slice(i, i + starts.length) === starts
						onfind('start', starts, i)
						i += starts.length - 1
						ends = wrap[1]
						break
						
			if !ends
				const rs = onfind('char', chr, i)
				if rs === false
					break
				else if rs !== undefined
					i = rs