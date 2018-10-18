//#!py
/**
 * @desc 解析name及方法参数
 * @include splitStringWithinWrap trim isNumberLike
 * @param {string} rule
 * @return {object}
 */
function splitNameWithMethods(name)
	const list = splitStringWithinWrap(name, '.')
	name = list.shift()
	
	const methods = list.map((name)=> {
		let args = []
		let index = name.indexOf('(')
		if index > -1
			let argStr = name.slice(index + 1, -1)
			name = name.slice(0, index)
			
			splitStringWithinWrap(argStr, ',').forEach(arg=> {
				arg = trim(arg)
				if arg === ''
					return
				if isNumberLike(arg)
					arg *= 1
				else if '\'"'.includes(arg[0])
					arg = arg.slice(1, -1)
				args.push(arg)
			})
			
		return [name, args]
	})
	
	return [name, methods]