//#!py
function char2index(chr)
	let i = chr.charCodeAt(0)
	select true
		case i >= 97
			i -= 97 - 10
		case i >= 65
			i -= 65 - 36
		case i >= 48
			i -= 48
	return i