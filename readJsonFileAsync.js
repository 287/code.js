//#!py
/**
 * @include readFileAsync
 * @param {string} path
 * @param {function} cb
 * @return {undefined}
 */
function readJsonFileAsync(path, cb)
	readFileAsync(path, (err, content)=>{
		if content
			content = content.length === 0 ? null : JSON.parse(content)
		cb(err, content)
	})