//#!py
/**
 * @include splitOnce trim isNumberLike
 */
function parseForAsStatement(str, toString, indexSubfix)
	let num, index, value, objectValue, starts, step, array, object, targetNum, targetArray, targetObject, rs
	
	indexSubfix = (indexSubfix ? indexSubfix : '')
		
	[num, step = '1'] = splitOnce(str, ' step ').map(v=> trim(v))
	[num, index = ''] = splitOnce(num, ' as ').map(v=> trim(v))
	
	if num.includes(' to ')
		[starts, num] = splitOnce(num, ' to ').map(v=> trim(v))
	
	starts = starts || '0'
		
	const tmp = index.split(index.includes(',') ? ',' : /\s+/).map(v=> trim(v))
	[index, value, objectValue] = tmp.reverse()
		
	if !index || index === '-'
		index = '__i' + indexSubfix
		
	if value === '-'
		value = '__' + (objectValue ? 'k' : 'v') + indexSubfix
		
	if objectValue === '-'
		objectValue = '__v' + indexSubfix
	
	if isNumberLike(num)
		objectValue = value = ''
	else
		[num, targetNum] = toParamName(num)
	
	if objectValue
		targetObject = targetNum
		object = num
		
		targetArray = `Object.keys(${object})`
		// array = `__${parseParamName(object)}_keys`.replace('_'.repeat(4), '__')
		array = `__k` + indexSubfix
	
	else if value
		array = num
		targetArray = targetNum
		
	if array
		num = `${array}.length`
		
	if !toString
		rs = {
			number: num,
			index,
			step,
		}
	else
		const plus = step.charAt(0) !== '-'
		const indexValue = plus ? starts : `${num} - 1`
		const statements = [
			`let `,
			plus ? `${index} < ${num}` : `${index} >= ${starts}`,
			['1', '-1'].includes(step) ? `${index}${plus ? '++' : '--'}` : `${index} += ${step}`,
		]
		
		const value_defs = []
		const value_refs = []
		
		if targetObject
			value_defs.push(`${object} = ${targetObject}`)
			
		if targetArray
			value_defs.push(`${array} = ${targetArray}`)
			
		else if targetNum
			value_defs.push(`${num} = ${targetNum}`)
		
		value_defs.push(`${index} = ${indexValue}`)
		
		if value
			value_defs.push(value)
			value_refs.push(`${value} = ${array}[${index}]`)
			
		if objectValue
			value_defs.push(objectValue)
			value_refs.push(`${objectValue} = ${object}[${value}]`)
		
		statements[0] += value_defs.join(', ')
			
		if value_refs.length
			statements[1] += ` && (${value_refs.join(', ')}, true)`
			
		rs = statements.join('; ')
		
	return rs
	
	// function parseParamName(str)
		// return str.replace(/\W/g, '_').replace(/^_+|_+$/g, '').replace(/_{2,}/g, '_')
		
	function toParamName(str)
		let name
		if !/^[\w\$\.]+$/.test(str)
			// name = '__' + parseParamName(str) + indexSubfix
			name = '__o' + indexSubfix
		return name ? [name, str] : [str, name]