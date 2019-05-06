//#!py
/**
 * @include createNodeByTpl
 */
function createSimpleDialogNode(op)
	const node = createNodeByTpl(`
div node="dialog"
	div node="header"
		div node="title"
		button nodes="close"
			"×"
	div node="body"
	div node="footer"
		button nodes="close"
			"关闭"
style
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 100px;
    right: 100px;
    background: #eee;
    width: auto;
    height: auto;
    background: #ffffff;
    border: 1px #191919 solid;
    border-radius: 5px;
	display: none
	
	&, >*
		box-sizing: border-box;
		
	$headerSize = 40
	$footerSize = 40
	
	button
		cursor: pointer;
		vertical-align: text-bottom;
		line-height: 20px;
		border: 1px solid #c5c5c5;
		background: #f6f6f6;
		border-radius: 3
	
	[node=header]
		
		[node=title]
			margin: 4
			height: $headerSize - &margin * 2
			line-height: &height
			background: #e9e9e9;
			border-radius: 3px;
			padding-left: 10px;
			border: 1px #ddd solid;
			font-weight: bold;
		button
			position: absolute
			top: 10
			right: 10
			size: 20
			
	[node=body]
		position: absolute
		top: $headerSize
		bottom: $footerSize
		width: 100%
		padding: 10px
		overflow: auto;
	[node=footer]
		height: $footerSize
		line-height: $footerSize
		position: absolute;
		bottom: 0;
		border-top: 1px #ddd solid;
		width: 100%;
		text-align: right;
		padding: 0 20px;
		
		button
			padding: 0 20px;
	
	`)
	
	/**
	 * @include getNodesByAttr
	 */
	const nodes = getNodesByAttr(node)
	
	Object.assign(node, {
		show,
		hide,
		close,
		setOptions,
		nodes,
	})
	
	for nodes.close as button -
		button.onclick = ()=> 
			node.hide()
			
	if node.styleNode
		document.head.append(node.styleNode)
	
	node.setOptions(op)
		
	return node
		
	function show(op)
		this.setOptions(op)
		this.style.display = 'block'
		this.dispatchEvent(new Event('show'))
		
	function close()
		/**
		 * @include removeNode
		 */
		removeNode(this)
		if this.styleNode
			removeNode(this.styleNode)
		this.dispatchEvent(new Event('close'))
		
	function hide()
		this.style.display = ''
		this.dispatchEvent(new Event('hide'))
		
	function setOptions(op)
		if !op
			return
			
		for ['title', 'body'] as key -
			let value = op[key]
			if value != null
				/**
				 * @include setNodeChild
				 */
				setNodeChild(this.nodes[key], value)