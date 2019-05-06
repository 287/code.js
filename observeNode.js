//#!py
function observeNode(node, cb)
	var config = { attributes: true, childList: true, subtree: true }
	var observer = new MutationObserver(cb)
	observer.observe(node, config)
	return observer
observeNode(document.body, console.log)