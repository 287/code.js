//#!py
/**
 * @include createFileSelectButton createNode
 * @param {object} op
 * @param {string} op.url
 * @param {function} cb
 * @return {labelelement}
 */
function createFileSelectButtonWithPreview(op)
	op = Object.assign({
		multiple: true,
		thumbSize: [200, 200],
	}, op)
	
	const wrap = createFileSelectButton(Object.assign({}, op, {
		onselect,
	}))
	
	const previewNode = createNode('<div class="preview-wrap"></div>')
	
	wrap.preview = previewNode
	
	return wrap
	
	function onselect(file)
		// documentcreate
		/**
		 * @include getNodesByAttr removeNode removeArrayValue getExtname
		 */
		const node = createNode(`<span node="wrap"><span node="thumb">${getExtname(file.name, true)}</span><span node="remove">移除</span><span node="tip">${file.name}</span></span>`)
		const nodes = getNodesByAttr(node)
		
		node.file = file
		
		nodes.remove.onclick = ()=>
			removeNode(node)
			removeArrayValue(button.files, file)
			if op.onremove
				op.onremove(file, node)
		
		if file.type.startsWith('image/')
			/**
			 * @include sizeKeys
			 * @include readFileAsDataUrl loadImage toCapitalize generateSizeByFit img2dataUrl
			 */
			readFileAsDataUrl(file, (err, dataUrl)=> {
				const img = loadImage(dataUrl, (err, img)=> {
					const size = sizeKeys.map(key=> file[key] = img[`natural${toCapitalize(key)}`])
					const newSize = generateSizeByFit(size, op.thumbSize, true)
					if size.some((v, i)=> newSize[i] !== v)
						sizeKeys.forEach((key, i)=> img[key] = newSize[i])
						// const dataUrl = img2dataUrl(img, file.type, .8)
						// file.thumbDataUrl = dataUrl
						// img.src = dataUrl
						
						/**
						 * @include img2canvas
						 */
						img2canvas(img).toBlob((blob)=> {
							file.thumbBlob = blob
							img.src = URL.createObjectURL(blob)
						}, file.type, .8)
				})
				nodes.thumb.innerHTML = ''
				nodes.thumb.append(img)
			})
		
		previewNode.append(node)
		
		if op.onselect
			op.onselect(file, node)