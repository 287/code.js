//#!py
/**
 * @include trim isStringStartsWiths isNumberLike
 * @param {function} fn - constructor function
 * @param {object} methods - ths methods of class
 * @param {function} fn
 */
function parseCreateTableStringToSql(str, type = 'mysql')
	const tables = []
	
	let table
	let item
	
	str.split('\n').forEach((line)=> {
		line = trim(line)
		if line === ''
			return
			
		if table
			item = {}
			table.items.push(item)
			
		line.split(/\s+/).forEach((cmd, index)=> {
			if cmd.startsWith('@')
				if table
					table.items.pop()
					
				table = {
					name: cmd.slice(1),
					items: [],
					uniqueKeys: [],
				}
				tables.push(table)
				item = table
				
			else if cmd.startsWith('#')
				item.comment = cmd.slice(1)
			else if isNumberLike(cmd)
				item.default = cmd
			else if isStringStartsWiths(cmd, ['"', "'"])
				item.default = cmd
			else if cmd.includes('(')
				item.type = cmd.replace('()', '')
			else if /^[a-z_][a-zA-Z0-9_]*$/.test(cmd) && index < 2
				item.key = cmd
			else
				select cmd
					case 'null'
						item.null = true
					case 'unique'
						table.uniqueKeys.push(item.key)
					case '++'
						item.autoIncrement = true
					case 'primary'
						item.primary = true
					default
						item.comment = cmd
						
		})
	})
	
	const sql = tables.map(table=> parseTableToSql(table)).join('\n\n')

	return sql
	
	function parseKey(key)
		return '`' + key + '`'
		
	function parseTableToSql(table)
		const sqls = []
		const {items, uniqueKeys, name, comment} = table
		
		sqls.push(`create table ${parseKey(name)} (`)
		
		const list = items.map((item)=> {
			let list = [
				parseKey(item.key),
				item.type,
			]
			
			list.push(item.null ? 'null' : 'not null')
			
			if item.autoIncrement
				list.push(`auto_increment`)
				
			if item.default
				list.push(`default ${item.default}`)
				
			if item.comment
				list.push(`comment '${item.comment}'`)
			
			return list.join(' ')
		})
		
		const primaryKeys = items.filter(item=> item.primary).map(item=> parseKey(item.key))
		if primaryKeys.length
			list.push(`primary key (${primaryKeys.join(', ')})`)
			
		sqls.push('\t' + list.join(',\n\t'))
		
		sqls.push(`)`)
		
		if comment
			sqls.push(`comment = '${comment}'`)
		
		sqls.push(`DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci`)
		
		sqls.push(`;`)
			
		if uniqueKeys.length
			const uniqueKeysString = uniqueKeys.map(key=> parseKey(key)).join(', ')
			sqls.push(`alter table ${parseKey(name)} add unique(${uniqueKeysString});`)
		
		return sqls.join('\n')