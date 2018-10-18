//#!py
/**
 * @include isString createNode random postForm
 * @param {object} op
 * @param {string} op.url
 * @param {function} cb
 * @return {labelelement}
 */
function createUploadButton(op, cb)
	if isString(op)
		op = {
			url: op
		}
	const id = random()
	const buttonId = 'upload-button-' + id
	const formId = 'upload-form-' + id
	
	const {url, multiple, accept = ''} = op
	
	const form = createNode(`<form id="${formId}" action="${url}" method="post" enctype="multipart/form-data" style="display: none"></form>`)
	const input = createNode(`<input type="file" name="file" id="${buttonId}" accept="${accept}" ${multiple ? 'multiple': ''}>`)
	const button = createNode(`<label upload-button for="${buttonId}">upload</label>`)
	
	form.append(input)
	input.onchange = ()=>
		if button.hasAttribute('disabled')
			return
		button.setAttribute('disabled', '')
		postForm(form, runcb)
	document.body.append(form)
	return button
	
	function runcb(...args)
		cb && cb(...args)
		button.removeAttribute('disabled')
		input.value = ''