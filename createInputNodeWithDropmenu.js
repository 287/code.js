//#!py
/**
 * @include createInputNode createDropmenuNode addOnceClickOtherEvent addEvents
 */
function createInputNodeWithDropmenu(options, op)
	const dropNode = createDropmenuNode(options, op)
	const inputNode = createInputNode()
	
	addEvents(inputNode, {
		focus(){
			dropNode.show()
		},
		blur(){
			setTimeout(()=> {
				// dropNode.hide()
			}, 220)
		},
		keydown(e){
			if e.keyCode === 40
				if dropNode.style.display === 'none'
					dropNode.show()
					e.stopPropagation()
		},
	})
	
	addEvents(dropNode, {
		change(){
			inputNode.value = dropNode.value
		},
		show(){
			addOnceClickOtherEvent([dropNode, inputNode], ()=> dropNode.hide())
		},
	})
	
	inputNode.dropNode = dropNode
	
	const node = document.createElement('span')
	node.append(inputNode)
	node.append(dropNode)
	
	return node