//#!py
/**
 * eg: <div id="wrap"><a on:click="show"></a><a on:click="hide()"></a><a on:click="copy(1)"></a><a on:click="blur(e, node, 'name')"></a></div>
 * eg: addNodeEvents(wrap, {show: function(e){}, hide: function(e){}, copy: function(id){}, blur: function(e, node, name){}});
 * @include eachNode eachObject addEvent
 * @param {element} node
 * @param {object} events
 * @param {object} [op]
 * @param {string} [op.prefix = 'on:']
 * @return {undefined}
 */
function addEvents(node, events, op)
	op = op || {}
	let prefix = op.prefix || 'on:'
	// Event & node 's placeholder
	let PEvent = []
	let PNode = []
	
	eachNode(node, (node)=> {
		let attrs = getAttrsByPrefix(node, prefix)
		if !attrs
			return
			
		eachObject(attrs, ([name, paramer], type)=>{
			let cb = events[name]
			if !cb
				return
			if !node._addEvents
				node._addEvents = []
			node._addEvents.push({
				type,
				key: prefix + type,
				callback: cb,
			})
			addEvent(node, type, (e)=>{
				let args = []
				if !paramer
					args.push(e)
				else
					args = paramer(e, node)
				cb(...args)
			})
		})
	})

	/**
	 * @include getNodeAttributes eachObject isEmptyObject
	 */
	function getAttrsByPrefix(node, prefix)
		let rs = {}
		let attrs = getNodeAttributes(node)
		eachObject(attrs, (name, key)=>{
			if key.startsWith(prefix) && name !== ''
				let paramer
				let i = name.indexOf('(')
				if i > -1
					let param = name.slice(i + 1, -1)
					name = name.slice(0, i)
					paramer = Function('e', 'node', 'return [' + param + ']')
					
				rs[key.slice(prefix.length)] = [name, paramer]
		})
		if isEmptyObject(rs)
			rs = null
			
		return rs