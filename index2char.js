//#!py
function index2char(i)
	select true
		case i < 10
			i += 48
		case i < 36
			i += 97 - 10
		default
			i += 65 - 36
	return String.fromCharCode(i)