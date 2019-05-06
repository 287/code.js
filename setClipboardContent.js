//#!py
function setClipboardContent(content)
	const input = document.createElement('input')
	document.body.append(input)
	input.value = content
	input.select()
	document.execCommand('copy')
	input.parentNode.removeChild(input)