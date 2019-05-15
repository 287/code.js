//#!py
/**
 * @include eachArray eachChildren toArrayIfNot
 * @param {string} str
 * @param {array<string>} rules
 * @return {boolean}
 */
function serializeTree(tree, op)
	op = Object.assign({
		getWrapStart: (node, conf)=>{
			return `<node>`
		},
		getWrapEnd: (node)=>{
			return `</node>`
		},
		withTab: true,
		tab: '\t',
		sep: '\n',
		removeRoot: false,
	}, op)
	
	// 节点最低属性
	// {
		// childs: []
	// }

	let list = []
	let lastLevel
	let index = 0
	
	let tabAdd = op.removeRoot ? -1 : 0
	
	eachChildren(tree, (node, conf)=>{
		if conf.level === 0 && op.removeRoot
			return
			
		let wrapper = [op.getWrapStart(node, conf), op.getWrapEnd(node, conf)]
			
		let tab = op.withTab ? op.tab.repeat(conf.level + tabAdd) : ''
		wrapper = wrapper.map((wrap)=> {
			wrap = toArrayIfNot(wrap).map((value)=> value == null ? null : value === '' ? '' : tab + value).filter(value=> value != null)
			if wrap.length === 0 || (wrap.length === 1 && wrap[0] == null)
				wrap = null
			else
				wrap = wrap.join('\n')
			return wrap
		})
		
		addChild(conf.level, wrapper)
	})
		
	list = list.filter(line => line !== null)
	
	return list.join(op.sep)
	
	function addChild(level, wrapper)
		if level === lastLevel
			//同级节点
			index++
		else if level < lastLevel
			//越级节点
			index += (lastLevel - level) * 1 + 1
		
		list.splice(index, 0, ...wrapper)
		lastLevel = level
		index++