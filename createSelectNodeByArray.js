//#!py
/**
 * @include isPureObject
 * @param {array|object} list
 * @param {object} [op]
 * @param {string} [op.text = 'title']
 * @param {string} [op.value = 'id']
 * @return {<element>}
 */
function createSelectNodeByArray(list, op = {})
	const select = document.createElement('select')
	
	list.forEach((value, i)=> {
		let text
		if isPureObject(value)
			text = value[op.text || 'title']
			value = value[op.value || 'id']
		else
			text = value
			value = i
			
		const option = document.createElement('option')
		option.value = value
		option.text = text
		select.appendChild(option)
	})
	
	return select