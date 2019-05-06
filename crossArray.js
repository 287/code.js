//#!py
/**
 * @desc 交叉叠加数组并生成每个值的交叉排列
 * @eg crossArray([1, 2], [3, 4]) => [[1,3], [1,4], [2,3], [2,4]]
 */
function crossArray(...args)
	let rs = []
	let arr = args[0]
	for let i = 1, l = args.length; i < l; i++
		arr.forEach((v)=> {
			args[i].forEach((v2)=> {
				let value
				// if is
				if i > 1
					value = v.slice(0)
					value.push(v2)
				else
					value = [v, v2]
				rs.push(value)
			})
		})
		arr = rs
		
		if i < l - 1
			rs = []
	if args.length === 1
		rs = arr.map(v=> [v])
	return rs