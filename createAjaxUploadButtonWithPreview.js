//#!py
/**
 * @include sizeKeys
 * @include createFileSelectButtonWithPreview createNode getByAjax
 * @param {object} op
 * @param {string} op.url
 * @param {function} cb
 * @return {labelelement}
 */
function createAjaxUploadButtonWithPreview(op, cb)
	// op = Object.assign({
		// onsubmit: null,
	// }, op)
	
	const wrap = createFileSelectButtonWithPreview(op)
	const button = createNode(`<span node="upload">upload</span>`)
	const progress = createNode(`<span node="progress"></span>`)
	wrap.prepend(button)
	wrap.preview.prepend(progress)
	wrap.progress = progress
	
	Object.assign(wrap, {
		button,
		submit(){
			const {files} = this
			if files.length == 0
				return
				
			const formData = this.toFormData()
			
			for files as file, i
				if file.thumbBlob
					formData.append('thumb', file.thumbBlob, file.name)
					
				const sizeValue = sizeKeys.map(key=> file[key]) + ''
				if sizeValue !== ','
					formData.append('::size::' + file.name, sizeValue)
			
			if op.onsubmit
				op.onsubmit(formData)
				
			let isFinished = false
				
			const xhr = getByAjax({
				url: op.url,
				method: 'post',
				data: formData,
			}, (err, rs)=> {
				isFinished = true
				// if err
				progress.innerHTML = ''
				
				cb(err, rs)
			})
			
			// xhr.onprogress = (e)=> 
				// console.log(e)
			xhr.upload.onprogress = (e)=> 
				if isFinished
					return
					
				const percent = (e.loaded / e.total * 100).toFixed(2) * 1
				// | 0
				progress.innerHTML = percent + '%'
				
				if op.onprogress
					op.onprogress(percent, progress)
				
			// this.files.splice(0)
		}
	})
		
	button.onclick = ()=>
		wrap.submit()
		
	return wrap