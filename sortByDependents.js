//#!py
/**
 * 依赖排序，通过依赖对应表对现有的名称进行排序。出现循环引用时不会报错
 * eg: sortByDependents(['a', 'b', 'c'], {a: ['d', 'e'], d: ['f', 'b', 'a']}) ->  ['f', 'b', 'd', 'e', 'a', 'c']
 * @param {array} names
 * @param {object} deps - dependents object
 * @return {array}
 */
function sortByDependents(names, deps)
	const sortedNames = []
	const pendings = {}
	
	names.forEach((name)=> push(name))
	
	return sortedNames
	
	function push(name)
		if pendings[name]
			return
			
		pendings[name] = true
		
		if deps[name]
			deps[name].forEach((name)=> push(name))
			
		sortedNames.push(name)