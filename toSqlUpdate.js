//#!py
/**
 * @include isString isBoolean
 */
function toSqlUpdate(table, data, op)
	if isBoolean(op)
		op = {prepare: op}
	else
		op = op || {}
	
	let {prepare} = op
	let param = []
	let sets = []
	Object.keys(data).forEach((key)=>{
		let value = data[key]
		if prepare
			param.push(value)
			value = '?'
		else
			if isString(value)
				value = `"${value}"`
			
		sets.push(`${key} = ${value}`)
	})
	
	let sql = `update ${table} set ${sets.join(', ')}`;
	
	return !prepare ? sql : [sql, param]