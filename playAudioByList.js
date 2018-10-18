//#!py
function playAudioByList(node, list, cb)
	let index = 0
	let overlap = 100
	let playbackRate = 1.5
	
	if overlap
		node.onplaying = onplaying
	else
		node.onended = playNext
	
	if playbackRate
		node.playbackRate = playbackRate
		
	play(index)
	
	function play(index)
		node.stop()
		node.src = list[index]
		
	function playNext()
		if index + 1 < list.length
			play(++index)
		else
			node.onplaying = null
			cb()
			
	function onplaying()
		setTimeout(()=>{
			playNext()
		}, node.duration * 1000 - overlap)