//#!py
/**
 * @include isString createNode random getNodesByAttr ifNull
 * @param {object} op
 * @param {string} op.url
 * @param {function} cb
 * @return {labelelement}
 */
function createFileSelectButton(op)
	op = Object.assign({
		name: 'file',
		multiple: false,
		accept: '',
		onselect: null,
		filterType: '',
	}, op)
	
	const id = random()
	const buttonId = 'file-input-' + id
	
	const wrap = createNode(`<span file-select-button><label node="select" for="${buttonId}">select</label><input node="input" type="file" id="${buttonId}" accept="${op.accept}" ${op.multiple && 'multiple' || ''} style="display: none"></span>`)
	const nodes = getNodesByAttr(wrap)
	const files = []
	
	Object.assign(wrap, {
		...nodes,
		files,
		toFormData(){
			const formData = new FormData
			for files as file, i
				formData.append('file', file)
			return formData
		},
	})
	
	nodes.input.onchange = ()=>
		for nodes.input.files as file, i
			if files.some(f=> isSameFile(f, file))
				continue
			if op.filterType
				if !file.type.startsWith(op.filterType)
					continue
			if file
				files.push(file)
				
			if op.onselect
				op.onselect(file)
			
			
		nodes.input.value = ''
		
	return wrap
		

	function isSameFile(file1, file2)
		return ['size', 'name', 'type', 'lastModified'].every(key=> file1[key] === file2[key])