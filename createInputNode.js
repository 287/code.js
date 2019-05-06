//#!py
/**
 * @desc supoort cancel submit event
 * @include addEvent
 * @return {inputelement}
 */
function createInputNode()
	const node = document.createElement('input')
	
	addEvent(node, 'keydown', (e)=> {
		select e.keyCode
			case 27
				node.dispatchEvent(new Event('cancel'))
			case 13
				node.dispatchEvent(new Event('submit'))
			default
				return
	})
	
	return node