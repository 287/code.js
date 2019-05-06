//#!py
/**
 * @param {array} values
 * @param {array} [texts]
 * @return {array<element>}
 */
function createOptionNodes(values, texts)
	const nodes = values.map((value, i)=> Object.assign(document.createElement('option'), {
		text: texts ? texts[i] : value,
		value,
	}))
	
	return nodes