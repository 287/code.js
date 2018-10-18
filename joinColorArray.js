//#!py
/**
 * @include 
 */
function joinColorArray(arr, type = 'hex', nonuseShortMode)
	let str = ''
	
	if arr[3] === 1
		arr = arr.slice(0, 3)
	else if arr[3]
		arr = arr.slice(0)
		arr[3] = Math.round(arr[3] * 100) / 100
	
	select type
		case 'hex'
			let isShort = true
			arr = arr.map((v, i)=> {
				let chr = (i === 3 ? Math.round(v * 255) : v).toString(16)
				if chr.length === 1
					chr = '0' + chr
				else if chr[0] !== chr[1]
					isShort = false
				return chr
			})

			if isShort && !nonuseShortMode
				arr = arr.map(v=> v[0])
			
			str = '#' + arr.join('')
			
		
		case 'rgb'
			if arr.length === 4
				type += 'a'
				
			str = `${type}(${arr.join(', ')})`
			
		case 'hsl'
			if arr.length === 4
				type += 'a'
				
			arr = arr.slice(0)
			for let i = 1; i <= 2; i++
				arr[i] += '%'
		
			str = `${type}(${arr.join(', ')})`
			
	return str