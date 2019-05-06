//#!py
/**
 * @desc 下拉框列表 - 支持 onchange 事件
 * @include toOptionNodesData setNodeAttrs setNodeAttr callFunction setNodeChild addRemoveKeys addEvent removeEvent
 * @param {object|array<object|array|any>} options
 * @param {object} [op]
 * @param {any} [op.value]
 * @param {string} [op.valueKey]
 * @param {string} [op.textKey]
 * @return {element}
 */
function createDropmenuNode(options, op = {})
	const wrapNode = document.createElement('div')
	wrapNode.setAttribute('dropmenu', 'wrap')
	
	Object.assign(wrapNode, {
		// display: true,
		hide,
		show,
		setOptions,
		selectedIndex: -1,
		itemNodes: [],
	})
	
	addEvent(wrapNode, 'click', onclick)
	addEvent(wrapNode, 'mousemove', onmousemove)
	
	Object.defineProperty(wrapNode, 'value', {
		get(){
			return this.selectedValue
		},
		set(value){
			value += ''
			if this.selectedValue !== value
				const index = this.itemNodes.findIndex(node=> node.getAttribute('value') === value)
				setNodeProperty(this.itemNodes, index, 'selected')
				this.selectedIndex = index
				this.selectedValue = value
				
				this.dispatchEvent(new Event('change'))
				
			return value
		},
	})
	
	wrapNode.hide()
	
	if options
		wrapNode.setOptions(options)
	
	return wrapNode
	
	
	function onkeydown(e)
		let {activeIndex, selectedIndex} = wrapNode
		const {keyCode} = e
		
		select keyCode
			case 27
				wrapNode.hide()
				
			case 13
				if activeIndex !== selectedIndex
					wrapNode.value = wrapNode.itemNodes[activeIndex].getAttribute('value')
				wrapNode.hide()
					
			case 38
			case 40
				activeIndex += keyCode < 39 ? -1 : 1
				activeIndex = Math.max(0, Math.min(activeIndex, wrapNode.itemNodes.length - 1))
				
				if activeIndex !== wrapNode.activeIndex
					wrapNode.activeIndex = activeIndex
					setNodeProperty(wrapNode.itemNodes, activeIndex, 'active')
					wrapNode.itemNodes[activeIndex].scrollIntoViewIfNeeded()
					
			default
				return
				
		e.preventDefault()
		e.stopPropagation()
		
	function setOptions(options)
		let [values, texts] = toOptionNodesData(options, op)
		
		const nodes = values.map((value, i)=> {
			const node = document.createElement('div')
			const text = texts[i]
			
			setNodeAttrs(node, {
				dropmenu: 'item',
				value,
				title: text,
			})
			
			node.innerHTML = text
			
			return node
		})
		
		setNodeChild(this, ...nodes)
		
		this.itemNodes = nodes
		
		return nodes
	
	
	function hide()
		if this.style.display !== 'none'
			setNodeProperty(this.itemNodes, null, 'active')
			removeEvent(document, 'keydown', onkeydown)
			this.bindedKeydown = false
			this.style.display = 'none'
			this.dispatchEvent(new Event('hide'))
		
	function show()
		if this.style.display === 'none'
			this.style.display = 'block'
			this.activeIndex = this.selectedIndex
			if !this.bindedKeydown
				this.bindedKeydown = true
				addEvent(document, 'keydown', onkeydown)
			this.dispatchEvent(new Event('show'))
		
	function onclick(e)
		const {target} = e
		if !target || target.getAttribute('dropmenu') !== 'item'
			return
			
		const value = target.getAttribute('value')
		
		this.value = value
		
		this.hide()
		
	function onmousemove(e)
		const index = this.itemNodes.indexOf(e.target)
		if index !== this.activeIndex
			this.activeIndex = index
			setNodeProperty(this.itemNodes, index, 'active')
		
		
	function setNodeProperty(nodes, index, key)
		nodes.forEach((node, i)=> setNodeAttr(node, key, i === index))
		