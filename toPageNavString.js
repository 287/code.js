//#!py
/**
 * @param {object} [op]
 * @param {number} [op.total = 0] - records number
 * @param {number} [op.page = 1] - current page number
 * @param {number} [op.limit = 20] - per page records number
 * @param {number} [op.buttons = 6] - display buttons number (not contains prev and next button)
 * @param {number} [op.pages] - total page number
 * @param {string} [op.url = '?page={page}'] - button url expression
 * @param {string} [op.tpl = '<a href="{url}" class="{class}">{name}</a>'] - render html expression
 * @param {string} [op.prevName = '<'] - button prev name
 * @param {string} [op.nextName = '>'] - button next name
 * @return {string}
 */
function toPageNavString(op = {})
	const total = op.total || 0
	const currentPage = op.page || 1
	const limit = op.limit || 20
	const pages = op.pages || Math.ceil(total / limit)
	const buttons = op.buttons || 7
	const url = op.url || '?page={page}'
	const tpl = op.tpl || '<a href="{url}" class="{class}">{name}</a>'
	const prevName = op.prevName || '<'
	const nextName = op.nextName || '>'
	
	// calc
	const pageArr = []
	let num
	
	if pages <= buttons
		// all
		for pages as i
			pageArr.push(i + 1)
			
	else if currentPage < (num = buttons - 2)
		// starts and last
		for num as i
			pageArr.push(i + 1)
			
		pageArr.push(null, pages)
			
	else if currentPage > (num = pages - (buttons - 2)) + 1
		// first and ends
		pageArr.push(1, null)
		
		for num to pages as i
			pageArr.push(i + 1)
	
	else
		// first and middle and last
		num = Math.floor((buttons - 4) / 2)
		pageArr.push(1, null)
		
		for currentPage - num - (buttons % 2) to currentPage + num as i
			pageArr.push(i + 1)
			
		pageArr.push(null, pages)
			
	// render
	const htmlArr = []
	
	if currentPage !== 1
		htmlArr.push(toString(currentPage - 1, prevName))
		
	for pageArr as page -
		htmlArr.push(toString(page))
	
	if currentPage !== pages
		htmlArr.push(toString(currentPage + 1, nextName))
	
	return htmlArr.join('')
	
	
	function toString(page, name)
		const classList = []
		if !page
			classList.push('ellipsis')
			
		if page === currentPage
			classList.push('current')
			
		const obj = {
			page,
			class: classList.join(' '),
			name: name || page || '...'
		}
		
		obj.url = !page || page === currentPage ? 'javascript:;' : url.replace(/\{(\w+)\}/g, (t, key)=> obj[key] || '')
		
		return tpl.replace(/\{(\w+)\}/g, (t, key)=> obj[key] || '')