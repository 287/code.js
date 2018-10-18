/**
 * 排序，通过依赖对应表对现有的名称进行排序。出现循环引用时不会报错
 * eg: sortByDeps(['a', 'b', 'c'], {a: ['d', 'e'], d: ['f', 'b', 'a']}) ->  ['f', 'b', 'd', 'e', 'a', 'c']
 * @param {string} name
 * @param {array<string>} [deps]
 * @param {array|object|function} [generator]
 * @param {object} [op]
 * @return {array}
 */
function define(){
	var item = {
		type: 'module'
		, name: null
		, generator: null
		, object: null
		, requires: []
		, option: {}
	}
	, key
	;
	each(arguments, function(arg, i){
		switch(typeOf(arg)){
			case 'string':
				item.name = arg;
				
			break; case 'array':
				item.requires = arg;
				
			break; case 'object':
				if(i === arguments.length - 1 && (item.object || item.generator)){		
					if(arg){
						for(key in arg){
							if(arg[key] != null) item.option[key] = arg[key];
						}
					}
				}else{
					item.object = arg;
				}
				
			break; case 'function':
				item.generator = arg;
		}
	});
	
	item.name = item.name != null ?  item.name : (this.__moduleName__ || '');
	
	return {
		name,
		generator,
		object,
		depent,
	};
}