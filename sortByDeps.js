/**
 * 排序，通过依赖对应表对现有的名称进行排序。出现循环引用时不会报错
 * eg: sortByDeps(['a', 'b', 'c'], {a: ['d', 'e'], d: ['f', 'b', 'a']}) ->  ['f', 'b', 'd', 'e', 'a', 'c']
 * @param {array} names
 * @param {object} deps - dependencies
 * @return {array}
 */
function sortByDependents(names, deps){
	var list = [];
	var sorting = {};
	names.forEach(function(name){
		push(name);
	});
	return list;
	
	function push(name){
		if(list.indexOf(name) !== -1 || sorting[name]) return;
		sorting[name] = 1;
		deps[name] && deps[name].forEach((name)=>{
			push(name);
		});
		list.push(name);
		delete sorting[name];
	}
}