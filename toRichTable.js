//#!py
function toRichTable(table, op = {})
	let {
		titleHeight,
		widths,
		width,
	} = op
	
	/**
	 * @include createNode
	 */
	const wrap = createNode(`<div node="rich-table" fit-width><div node="head"></div><div node="body"></div></div>`)
	/**
	 * @include getNodesByAttribute
	 */
	const nodes = getNodesByAttribute(wrap)

	const headTable = table.cloneNode()

	const titleTr = table.querySelector('tr')
	const firstTr = titleTr.nextSibling

	nodes.body.onscroll = ()=> 
		nodes.head.scrollLeft = nodes.body.scrollLeft
		
	/*
	const height = 30
	// parseInt(getComputedStyle(titleTr).height)
	const widths = []

	for firstTr.childNodes as td i
		const width = op.minWidth || parseInt(getComputedStyle(td).width)
		widths.push(width)
		
	if op.fillWidth && table.parentNode
		const wrapWidth = table.parentNode.clientWidth
		const totalWidth = widths.reduce((c, v)=> c + v, 0)
		if totalWidth < wrapWidth
			const added = (wrapWidth - totalWidth) / widths.length
			widths.forEach((w, i)=> widths[i] = w + added)

	nodes.body.style.top = `${height}px`

	for widths as width i
		[firstTr, titleTr].forEach((tr)=> {
			const td = tr.children[i]
			td.style.width = `${width}px`
			// td.style.maxWidth = `${width}px`
			// td.style.minWidth = `${width}px`
		})
	*/

	nodes.head.append(headTable)
	nodes.body.append(table)
	headTable.append(titleTr)
		
	if !titleHeight
		titleHeight = table.querySelector('tr').clientHeight || 30
		
	if !widths
		widths = {}
		const tds = table.querySelectorAll('tr:first-child td')
		let itemSize = 100
		if width
			itemSize = width / tds.length
		for tds as td i
			widths[i] = parseInt(getComputedStyle(td).width || itemSize)
			
	setTitleHeight(titleHeight)
	setColWidths(widths)

	
	Object.assign(wrap, {
		setTitleHeight
		setColWidth
		setColWidths
		nodes
	})
		
	return wrap
	
	
	function setTitleHeight(height)
		nodes.body.style.top = `${height + 1}px`
		
	function setColWidths(widths)
		for widths as width index -
			setColWidth(index, width)
	
	function setColWidth(index, width)
		for wrap.querySelectorAll(`td:nth-child(${index * 1 + 1})`) as node -
			node.style.minWidth = node.style.maxWidth = node.style.width = `${width}px`
		
		
/**
 * @include addCssNode
 */
addCssNode(`
[node=rich-table]
	position: relative
	height: 100%;
	
	&,[node=head],[node=body]
		border-color: inherit
	
	&[fit-width]
		table
			width: 100%;

	[node=head]
		overflow: hidden;
		
	[node=body]
		overflow: auto;
		overflow: overlay;
		position: absolute
		bottom: 0
		left: 0
		top: 0
		right: 0
	table
		border-collapse: collapse;
		border-color: inherit
	td
		overflow: hidden;
		padding: 0 1em;
		box-sizing: border-box;
		border-color: inherit
		border-width: 1
		border-style: solid
`, 'rich-table')