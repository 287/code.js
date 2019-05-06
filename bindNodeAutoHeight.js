//#!py
/**
 * @param {element} node
 * @param {object} [op]
 * @param {number} [op.min]
 * @param {number} [op.max]
 * @return {undefined}
 */
function bindNodeAutoHeight(node, op = {})
	node.addEventListener('paste', autoHeight)
	node.addEventListener('keyup', autoHeight)
	autoHeight()
	
	function autoHeight()
		let height = node.scrollHeight
		/**
		 * @include toBetween
		 */
		height = toBetween(height, op.min, op.max)
		node.style.height = `${height}px`