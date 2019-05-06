//#!py
function versionNumber2versionString(num, ratio = 1000, len = 2)
	const marks = []
	while num >= ratio
		const multiple = num / ratio | 0
		const mark = num - multiple * ratio
		num = multiple
		
		marks.push(mark)
		
	marks.push(num)
	
	for len - marks.length
		marks.push(0)
		
	return marks.reverse().join('.')