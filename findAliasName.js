//#!py
/**
 * @desc 多次别名指向的最终结果
 * @param {string} name
 * @param {object} aliasMap
 * @return {string}
 */
function findAliasName(name, aliasMap)
	let names = [name]
	while aliasMap[name]
		if names.includes(aliasMap[name])
			break
		name = aliasMap[name]
		names.push(name)
	return name