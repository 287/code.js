//#!py
/**
 * @include ltKeys sizeKeys
 * @include toCapitalize
 */
function scrollNodeByPercent(node, percent, xMode)
	const i = +!xMode
	const offsetKey = toCapitalize(ltKeys[i])
	const sizeKey = toCapitalize(sizeKeys[i])
	
	const values = ['client', 'scroll'].map(key=> node[key + sizeKey])
	const scrollValue = values[1] - values[0]
	return node['scroll' + offsetKey] = scrollValue * percent