//#!py
/**
 * @include parseNumberValue
 * @param {any} value
 * @param {number} rectValue
 * @return {number}
 */
function parseRectValue(value, pValue, sValue)
	let map = {
		left: 0,
		top: 0,
		right: '100%',
		bottom: '100%',
		// center: '50%',
	}
	
	if ['auto', 'center'].includes(value)
		value = (pValue - sValue) / 2
		
	if map[value] !== undefined
		value = map[value]
		
	return parseNumberValue(value, pValue)