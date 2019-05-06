//#!py
function bindNodeAutoScroll(node, op)
	op = Object.assign({
		offset: 20,
		duration: .5,
		interval: 3,
		delay: 0,
	}, op)
	
	op.timer = setTimeout(scroll, op.delay * 1000)
	
	op.stop = ()=> 
		clearTimeout(op.timer)
		op.timer = null
		
	op.start = ()=> 
		scroll()
	
	return op
	
	function scroll()
		op.timer = setTimeout(()=> {
			const height = node.scrollHeight - node.clientHeight
			if height <= 0
				return
			
			
			if node.scrollTop >= height
				scrollTo(-height, op.duration, scroll)
			else
				const targetOffset = op.offset === 'page' ? node.clientHeight : op.offset
				scrollTo(targetOffset, op.duration, scroll)
			
		}, op.interval * 1000)
		
	function scrollTo(targetOffset, duration, cb)
		const sign = targetOffset / Math.abs(targetOffset)
		const offsetValue = Math.abs(targetOffset)
		const animateInterval = duration * 1000 / 24
		const step = offsetValue / 24
		
		// Math.max((targetOffset / step), 30)
		// console.log(animateInterval, step)
			
		const scrollTop = node.scrollTop
		
		let offset = 0
		
		const timer = setInterval(()=> {
			if offset >= offsetValue
				 clearInterval(timer)
				 cb()
			else
				offset += step
				node.scrollTop = scrollTop + offset * sign
			
		}, animateInterval)
		