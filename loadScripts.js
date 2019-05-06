//#!py
/**
 * @include isArray loadScript
 * @param {array<string>|string} srcs
 * @return {undefined}
 */
function loadScripts(srcs, cb){
	srcs = isArray(srcs) ? srcs : [srcs]
	const nodes = srcs.map((src, i)=> {
		return loadScript(src, (err)=> {
			if err
				cb(err)
			else
				nodes[i].loaded = true
				if nodes.every(node=> node.loaded)
					cb()
		})
	})
	return nodes