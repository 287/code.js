//#!py
/**
 * @desc 只assign原始节点中已存在的key
 * @include isObject eachObject
 */
function assignLimitKeys(target, ...args)
	target = isObject(target) ? target : {}
	const keys = Object.keys(target)
	
	args.forEach((obj)=>{
		isObject(obj) && keys.forEach((key)=>{
			let value = obj[key]
			if value !== undefined
				target[key] = value
		})
	})
	
	return target