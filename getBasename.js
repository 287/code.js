//#!py
function getBasename(path, ext)
	let sep = '/'
	let i = path.lastIndexOf(sep)
	let end = path.length
	if i === -1
		sep = '\\'
		i = path.lastIndexOf(sep)
	if i === path.length - 1
		end = i
		i = path.lastIndexOf(sep, end - 1)
		
	if ext && path.slice(-ext.length) === ext
		end -= ext.length
		
	return path.slice(i + 1, end)