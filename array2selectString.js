//#!py
function array2selectString(arr, op = {})
	let list = []
	let {textKey = 'title', valueKey = 'id', selected, prefixs = [], disableds = []} = op
	if op.setDefault
		list.push(`<option value="">===请选择===</option>`)
	arr.forEach((item, i)=>{
		let text = ((prefixs[i] || '') + (item[textKey] || '')).replace(/ /g, '&nbsp;')
		let html
		if disableds.includes(item[valueKey])
			html = `<optgroup label="${item[textKey]}"></optgroup>`
		else
			html = `<option value="${item[valueKey]}"${item[valueKey] === selected ? ' selected' : ''} title="${item[textKey]}">${text}</option>`
		list.push(html)
	})
	
	return `<select>${list.join(',')}</select>`