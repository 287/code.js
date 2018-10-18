//#!py
/**
 * @include colorTypes
 */
function splitColorString(str, withOpacity)
	let type = ''
	const arr = []

	if str === 'transparent'
		type = 'rgb'
		arr.push(0, 0, 0, 0)
	
	else if str.charAt(0) === '#'
		type = 'rgb'
		str = str.slice(1)
			
		for let i = 0, l = str.length, step = [3, 4].includes(l) ? 1 : 2; i < l; i += step
			let chr = str.slice(i, i + step)
			if step === 1
				chr += chr
			arr.push(parseInt(chr, 16))
		
		if arr[3] != null
			arr[3] = arr[3] / 255
	else
		type = str.slice(0, 3)
		if colorTypes.includes(type)
			str.replace(/\d+(\.\d+)*|\.\d+/g, (t, i)=> arr.push(t * 1))
	
	if withOpacity
		if arr.length === 3
			arr.push(1)
			
	return [type, arr]