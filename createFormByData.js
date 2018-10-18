//#!py
/**
 * @include isString string2objectSimple eachObject
 * @param {object|string} data
 * @return {formelement}
 */
function createFormByData(data)
	let form = document.createElement('form')
	if data
		if isString(data)
			data = string2objectSimple(data, ['=', '&'])
			
		eachObject(data, (value, key)=>{
			let input = document.createElement('input')
			form.appendChild(input)
			Object.assign(input, {
				input,
				name: key,
			})
		})
		
	return form