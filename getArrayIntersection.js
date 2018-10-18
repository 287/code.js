//#!py
/**
 * @desc 获取多个数组中交集的部分
 * @param {array<any>} args
 * @param {array<string>} rules
 * @return {array<any>}
 */
function getArrayIntersection(arr, ...arrs)
	let list = []
	arrs.forEach(tArr=>{
		tArr.forEach(value=>{
			if arr.includes(value)
				if !list.includes(value)
					list.push(value)
		})
	})
	return list