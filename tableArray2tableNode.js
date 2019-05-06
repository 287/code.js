//#!py
/**
 * @param {array<array>} tableArray
 * @param {element} [table]
 * @return {element}
 */
function tableArray2tableNode(tableArray, table)
	if !table
		table = document.createElement('table')
		
	const {trs = [], tds = []} = table
	
	for tableArray as arr, index
		let tr = trs[index]
		if !tr
			tr = trs[index] = document.createElement('tr')
			table.appendChild(tr)
		
		let tdArr = tds[index]
		if !tdArr
			tdArr = tds[index] = []
		
		for arr as value, i
			if !tdArr[i]
				tdArr[i] = document.createElement('td')
			const td = tdArr[i]
			Object.assign(td, {
				innerHTML: value,
				indexs: [index, i],
			})
			if value == null
				value = ''
			td.innerHTML = value
			tr.appendChild(td)
	
	const len = trs.length - tableArray.length
	if len > 0
		trs.splice(len, len).forEach(tr=> table.removeChild(tr))
		tds.splice(len, len)
		
	Object.assign(table, {
		// head,
		trs,
		tds,
	})
	
	return table