/**
 * syntax like mongodb
 * command: select(query), from(table), where, join, group, order, limit, offset(skip)
 * command: $or, $gt, $lt, $gte, $lte, $ne, $e, $like, $nlike, $in, $nin
 * @include parseSqlWhereObject, isPureObject, isArray, isString, isBoolean
 * @param {object} obj
 * @param {object} [op]
 * @param {function} [op.parseKey = null]
 * @param {boolean} [op.prepare = false]
 * @return {string}
 */
function parseSqlObject(obj, op){
	op = isBoolean(op) ? {prepare: op} : op || {};
	var keys = ['delete', 'update', 'insert', 'select', 'from', 'data', 'where', 'group', 'order', 'limit', 'offset'];
	var keyAlias = {
		offset: 'skip',
		from: 'table',
		remove: 'delete',
		select: 'query',
	};
	var list = [];
	var params = [];
	var out, type, data;
	
	keys.forEach((key)=>{
		var targetKey = keyAlias[key] || key;
		var value = obj[targetKey] != null ? obj[targetKey] : obj[key];
		if(value == null){
			return ;
		}
		out = null;
		switch(key){
		case 'update': case 'insert': case 'delete':
			type = key;
			if(key !== 'delete'){
				data = value;
			}else{
				if(isString(value) && value.length > 0 && (!obj.from && !obj.table)){
					obj.from = value;
				}
			}
			out = key + (key === 'insert' ? ' into' : '');
			
		break; case 'where':
			if(isPureObject(value)){
				value = parseSqlWhereObject(value, op);
				if(!isString(value)){
					params.push(...value[1]);
					value = value[0];
				}
			}
			
		break; case 'select': case 'group':
			if(isString(value)){
				value = [value];
			}
			if(!isArray(value)){
				return ;
			}
			value = value.map((key)=> parseKey(key));
		
		break; case 'order':
			if(isPureObject(value)){
				var tList = [];
				for(var k in value){
					tList.push([k, value[k]])
				}
				value = tList;
			}
			if(!isArray(value)){
				return ;
			}
			value = value.map(([key, value])=> `${parseKey(key)} ${value === -1 ? 'desc' : 'asc'}`).join(', ');
			
		break; case 'limit': case 'offset':
			if(value === -1){
				return ;
			}
		break; case 'from':
			value = parseKey(value);
			
			if(data){
				key = '';
				let sql, param;
				if(type === 'insert'){
					let keys = Object.keys(data).map((key)=> parseKey(key)).join(', ');
					let values = Object.values(data).map(value=> parseValue(value)).join(', ');
					sql = `(${keys}) values (${values})`;
				}else if(type === 'update'){
					let keys = Object.keys(data).map((key, i)=> parseKey(key) + ' = ' + parseValue(data[key])).join(', ');
					sql = `set ${keys}`;
				}
				out = `${value} ${sql}`;
			}
		break; default:
			value = parseValue(value);
		}
		
		if(out === null){
			out = isArray(value) ? value.join(', ') : value;
			var added = ['group', 'order'].indexOf(key) > -1 ? ' by' : '';
			out = `${key}${added} ${out}`;
		}
		list.push(out);
	});
	
	out = list.join(' ');
	if(op.prepare){
		out = [
			out,
			params,
		];
	}
	return out;
	
	
	function parseValue(value){
		if(op.prepare){
			params.push(value);
			value = '?';
		}
		return value;
	}
	
	function parseKey(value){
		if(op.parseKey && value !== '*'){
			value = op.parseKey(value);
		}
		return value;
	}
}