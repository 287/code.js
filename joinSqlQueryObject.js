//#!py
/**
 * syntax like mongodb
 * command: select(query), from(table), where, join, group, order, limit, offset(skip)
 * command: $or, $gt, $lt, $gte, $lte, $ne, $e, $like, $nlike, $in, $nin
 * @include isBoolean isObject isString isArray isNumber isPureObject eachObjectMapArray eachObject parseSqlWhereObject
 * @param {object} obj
 * @param {object} [op]
 * @param {function} [op.parseKey = null]
 * @param {boolean} [op.prepare = false]
 * @return {string}
 */
function joinSqlQueryObject(sqlObject, op)
	if isBoolean(op)
		op = {prepare: op}
	else
		op = op || {}
	
	const keywords = ['delete', 'update', 'insert', 'select', 'from', 'query', 'table', 'data', 'where', 'group', 'order', 'offset', 'skip', 'limit']
	
	const preset = {
		where: null,
		group: null,
		order: null,
		limit: null,
		offset: null,
	}
	let command
	let data
	let table
	
	keywords.forEach((keyword)=> {
		let value = sqlObject[keyword]
		
		if value == null
			return
		
		switch keyword
			case 'update'
			case 'insert'
			case 'delete'
				command = keyword
				
				if isObject(value)
					data = value
				else
					table = value
				break
				
			 case 'select'
				command = keyword
				
				if isString(value)
					if value === ''
						value = '*'
					value = [value]
				else if !isArray(value)
					value = null
				
				data = value
				break
			
			 case 'table'
			 case 'from'
				table = value
				break
				
			 case 'data'
				data = value
				break
				
			 case 'query'
				data = value
				break
				
			 case 'group'
				if isString(value)
					value = [value]
				else if !isArray(value)
					value = null
				
				preset.group = value
				break
				
			 case 'order'
				if isPureObject(value)
					value = eachObjectMapArray(value, (value, key)=> [key, value])
				if !isArray(value)
					return
				
				preset.order = value.map(item=> {
					if isNumber(item[1])
						item[1] = item[1] < 0 ? 'desc' : 'asc'
					return item.join(' ')
				}).join(', ')
				
				break
				
			 case 'limit'
				if isArray(value)
					preset.offset = value[0]
					preset.limit = value[1]
				else
					preset.limit = value
				
				break
				
			 case 'offset'
			 case 'skip'
				preset.offset = value
				
				break
				
			 case 'where'
				preset.where = parseSqlWhereObject(value, op)
			 
				break
	})
	
	const list = []
	const params = []
	
	// `select * from ${table} where id = ? and sid = `
	// `delete from ? where id = ?`
	// console.log(preset)
	let sql
	
	switch command
		case 'select'
			sql = `select ${data} from ${table}`
			break
			
		case 'delete'
			sql = `delete from ${table}`
			break
			
		case 'insert'
		case 'update'
			let info = (command === 'insert' ? toSqlInsert : toSqlUpdate)(table, data, op)
			if op.prepare
				sql = info[0]
				params.push(...info[1])
			else
				sql = info
			break
			
	list.push(sql)
	eachObject(preset, (value, key)=>{
		if value == null
			return
			
		list.push(key, value)
	})
	
	return list.join(' ')