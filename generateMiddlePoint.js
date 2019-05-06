//#!py
function generateMiddlePoint(startsPoint, endsPoint, percent = .5)
	const middlePoint = []
	for 2 as i
		middlePoint[i] = (endsPoint[i] - startsPoint[i]) * percent + startsPoint[i]
	return middlePoint