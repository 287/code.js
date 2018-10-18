//#!py
/**
 * @param {string} href - css url
 * @return {element}
 */
function loadCss(href)
	let node = document.createElement('link')
	node.setAttribute('rel', 'stylesheet')
	node.setAttribute('href', href)
	(document.head || document.body).appendChild(node);
	return node