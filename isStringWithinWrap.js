
function isStringWithinWrap(str)
	let wraps = {
		'{': '}',
		'[': ']',
		'(': ')',
		'"': '"',
		'\'': '\'',
	}
	if str.length > 1 && wraps[str[0]] && wraps[str[0]] === str[str.length - 1]
		
	findChrIndexWithoutWrapInString()