//#!py
/**
 * @include eachChildren
 */
function treeObject2levelArray(tree)
	const levels = []
	eachChildren(tree, (node, conf)=> {
		const {level} = conf
		levels[level] = levels[level] || []
		levels[level].push(node)
	})
	return levels