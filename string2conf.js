//#!py
/**
 * parse string to conf
 * @include string2object parseConfValue
 * @param {string} str - the string
 * @param {list<string|regexp>} seps - separators list
 * @return {object}
 */
function string2conf(str, seps, op)
	const obj = string2object(str, seps, op)
	eachObject(obj, (value, key)=> obj[key] = parseConfValue(value))
	return obj