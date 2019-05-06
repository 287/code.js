//#!py
/**
 * @include isString isNumber isObject
 * @include createNode getNodesByAttribute addStyleNode
 */
function showTip(msg, ...args)
	const op = {
		timeout: 10,
		type: 'info',
	}
	
	for args as value -
		if isString(value)
			op.type = value
		else if isNumber(value)
			op.timeout = value
		else if isObject(value)
			op = Object.assign(op, value)
			
	let tipWrap = document.querySelector(`[tip-role=wrap]`)
	if !tipWrap
		tipWrap = createNode(`<div tip-role="wrap"></div>`)
		document.body.append(tipWrap)
		if !document.querySelector(`[tip-style]`)
			addStyleNode(`
			[tip-role=wrap]{position: absolute; top: 20px; width: 480px; margin: 0 auto; left: 50%; transform: translateX(-50%); font-size: 14px; max-height: 127px; overflow: auto;}
			[tip-role=item]:last-child{margin-bottom: 0;}
			[tip-role=item]{position: relative; padding: .5em 1em; color: #fff; background: #333; margin-bottom: .5em; transition: .5s;}
			[tip-role=content]{margin-right: 1.5em; word-break: break-word;}
			[tip-role=close]{position: absolute; right: 1em; top: .5em; cursor: pointer;}
			[tip-type=info]{background: #6b9dd2;}
			[tip-type=success]{background: #19b91f;}
			[tip-type=warn]{background: #ffb800;}
			[tip-type=error]{background: #ff5454;}
			`, 'tip-style')
	
	const tipItem = createNode(`<div tip-role="item"><div tip-role="content"></div><span tip-role="close">×</span></div>`)
	const nodes = getNodesByAttribute(tipItem, 'tip-role')
	// nodes.content.innerHTML = msg
	nodes.close.onclick = close
		
	// if op.timeout
		// tipItem.timer = setTimeout(close, op.timeout * 1000)
	
	function open()
		if tipItem.isConnected
			return
			
		Object.assign(tipItem, {
			open,
			close,
			nodes,
			content: msg
		}, op)
		
		tipWrap.prepend(tipItem)
		
	function close()
		clearTimeout(tipItem.timer)
		tipWrap.removeChild(tipItem)
		
	Object.defineProperty(tipItem, 'type', {
		set(value){
			this.setAttribute('tip-type', value)
		}
	})
		
	Object.defineProperty(tipItem, 'timeout', {
		set(value){
			clearTimeout(this.timer)
			if value
				if !isNumber(value)
					value = 10
				this.timer = setTimeout(close, value * 1000)
		}
	})
		
	Object.defineProperty(tipItem, 'content', {
		set(value){
			nodes.content.innerHTML = value
		}
	})
	
	open()
		
	return tipItem
		