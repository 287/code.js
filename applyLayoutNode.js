//#!py
/**
 * @include updateLayoutStyle setNodeStyle
 */
function applyLayoutNode(node = document)
	Array.from(node.querySelectorAll('[layout]')).forEach((node)=> {
		const type = node.getAttribute('layout')
		setLayout.call(node, type)
	})
		
	function setLayout(type)
		const node = this
		node.setAttribute('layout', type)
		
		if type
			const nodes = Array.from(node.childNodes).filter(node=> node.nodeType === 1)
			const styles = nodes.map(node=> {
				node.setSize = setSize
				const size = node.getAttribute('size')
				return {
					itemSize: size
				}
			})
			Object.assign(node, {
				setLayout,
				updateLayout,
				layoutData: {
					type,
					nodes,
					styles,
				},
			})
			node.updateLayout()
		
	function toggleSize()
		
	
	function setSize(size)
		const node = this
		this.setAttribute('size', size)
		const {nodes, styles} = node.parentNode.layoutData
		styles[nodes.indexOf(node)].itemSize = size
		node.parentNode.updateLayout()
		
	function updateLayout()
		const node = this
		const {nodes} = node.layoutData
		node.layoutData.style = node.getBoundingClientRect()
		
		updateLayoutStyle(node.layoutData).forEach((style, i)=> {
			const node = nodes[i]
			setNodeStyle(node, style)
			node.dispatchEvent(new Event('resize'))
			if node.updateLayout
				node.updateLayout()
		})
		