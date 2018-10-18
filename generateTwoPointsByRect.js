//#!py
/**
 * @desc 获取矩形对象的左上角 及 右下角的两个点坐标
 * @param {object} rect
 * @return {array<array<number>>}
 */
function generateTwoPointsByRect(rect)
	const ltKeys = ['left', 'top']
	const sizeKeys = ['width', 'height']
	const p1 = ltKeys.map(key=> rect[key])
	const p2 = sizeKeys.map((key, i)=> p1[i] + rect[key])
	
	return [p1, p2]