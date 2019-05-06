//#!py
/**
 * @desc 无法生效
 */
function getClipboardContent(content)
	const input = document.createElement('input')
	document.body.append(input)
	input.focus()
	document.execCommand('paste')
	const rs = input.value
	input.parentNode.removeChild(input)
	return rs