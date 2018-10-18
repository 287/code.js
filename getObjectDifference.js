//#!py
/**
 * @desc 获取多个对象value不一致的的部分
 * @include eachObject
 * @param {object} obj
 * @return {object}
 */
function getObjectDifference(obj, ...arrs)
	const rs = {}
	
	arrs.forEach(tObj=> {
		eachObject(tObj, (value, key)=> {
			if obj[key] !== value
				rs[key] = value
		})
	})
	
	return rs