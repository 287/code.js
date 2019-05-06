//#!py
/**
 * @include insertNodeAfter insertNodeBefore insertNodePrepend
 * @param {element} node
 * @param {element} placeholder
 * @return {element}
 */
function insertNode(node, placeholder, type)
	select type
		case 'after'
			insertNodeAfter(node, placeholder)
		case 'before'
			insertNodeBefore(node, placeholder)
		case 'prepend'
			insertNodePrepend(node, placeholder)
		default
			placeholder.appendChild(node)
	return node
