/**
 * syntax like mongodb
 * command: $or, $gt, $lt, $gte, $lte, $ne, $eq, $like, $nlike, $in, $nin
 * @include isPureObject, isArray, isNumber, isEmpty, isBoolean
 * @param {object} obj
 * @param {object} [op]
 * @param {function} [op.parseKey = null]
 * @param {boolean} [op.prepare = false]
 * @return {string}
 */
function parseSqlWhereObject(obj, op){
	op = isBoolean(op) ? {prepare: op} : op || {};
	var params = [];
	var out = parse(obj);
	if(op.prepare){
		out = [
			out,
			params,
		];
	}
	return out;
	
	function parse(obj){
		var list = [];
		for(var key in obj){
			var item = obj[key];
			var out;
			if(key === '$or'){
				delete obj[key];
				out = parseOr(item, isEmpty(obj));
			}else{
				if(!isPureObject(item)){
					key = parseKey(key);
					item = parseValue(item);
					out = `${key} = ${item}`;
				}else{
					out = parseItem(item, key);
				}
			}
			list.push(out);
		}
		return list.join(` and `);
	}
	
	function parseOr(arr, notWrap){
		var list = [];
		if(isArray(arr)){
			for(var i = 0, item; i < arr.length; i++){
				item = arr[i];
				list.push(parse(item));
			}
		}else{
			for(var key in arr){
				var value = arr[key];
				var item = {};
				item[key] = value;
				list.push(parse(item));
			}
		}
		var out = list.join(' or ');
		if(list.length > 1 && !notWrap){
			out = `(${out})`;
		}
		return out;
	}
	
	function parseItem(obj, key){
		var symbols = {"$gt":">","$lt":"<","$gte":">=","$lte":"<=","$ne":"!=","$eq":"=","$like":"like","$nlike":"like","$in":"in","$nin":"not in"};
		var list = [];
		var out;
		for(var sym in obj){
			var value = obj[sym];
			var symb = symbols[sym];
			if(symb){
				if(['$in', '$nin'].indexOf(sym) !== -1){
					value = `(${value.join(', ')})`;
				}
				key = parseKey(key);
				value = parseValue(value);
				out = `${key} ${symb} ${value}`;
				list.push(out);
			}
		}
		out = list.join(' and ');
		if(list.length > 1){
			out = `(${out})`;
		}
		return out;
	}
	
	function parseValue(value){
		if(op.prepare){
			params.push(value);
			value = '?';
		}
		return value;
	}
	
	function parseKey(value){
		if(op.parseKey){
			value = op.parseKey(value);
		}
		return value;
	}
}
