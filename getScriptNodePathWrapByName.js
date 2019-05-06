//#!py
/**
 * @include querySelectorAll getDirname getExtname
 */
function getScriptNodePathWrapByName(name = 'main')
	for querySelectorAll('script') as node -
		if new RegExp(`(\\W|^)${name}(\\.js)?`).test(node.src)
			return [getDirname(node.src), getExtname(node.src)]
	return ['', '']