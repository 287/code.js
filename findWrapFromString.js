//#!py
/**
 * 替换掉字符串中以单或双引号包裹起来的部分
 * @param {string} str
 * @param {array<string|array<string>>} wraps - wrap: wrapStartsString, wrapEndsString, [escapeString]
 * @param {function} onfind
 * @param {number} [start = 0]
 * @param {number} [start = 0]
 * @return {undefined}
 */
function findWrapFromString(string, wraps, onfind, startsIndex = 0, endsIndex = string.length)
	let starts
	let ends
	let escapeKey
	let stacks = 0
	let index
	
	for startsIndex to endsIndex as i
		const chr = string[i]
		
		if ends
			if chr === ends[0]
				if string.slice(i, i + ends.length) === ends
					if escapeKey
						if escapeKey === ends
							if string.slice(i + ends.length, i + ends.length + escapeKey.length) === escapeKey
								i += ends.length + escapeKey.length - 1
								continue
						else
							if string.slice(Math.max(i - escapeKey.length, index), i) === escapeKey
								continue
					
					if stacks
						stacks--
					else
						onfind('end', ends, i)
						i += ends.length - 1
						ends = null
					
			else if chr === starts[0]
				if string.slice(i, i + starts.length) === starts
					stacks++
					
		else
			for wraps as wrap -
				starts = wrap[0]
				
				if chr === starts[0]
					if string.slice(i, i + starts.length) === starts
						onfind('start', starts, i)
						ends = wrap[1]
						escapeKey = wrap[2]
						index = i
						
						i += starts.length - 1
						break
						
			if !ends
				const rs = onfind('char', chr, i)
				if rs === false
					break
				else if rs !== undefined
					i = rs