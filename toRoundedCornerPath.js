//#!py
/**
 * @include eachPointPath getFilletControlPoint isClosedPath getAngleOfPointOnCircle fixNumber
 * @param {array<array>} path
 * @param {number} [rounded = 3]
 * @return {array<array>}
 */
function toRoundedCornerPath(path, rounded = 3)
	const paths = []
	eachPointPath(path, (path)=> {
		const newPath = []
		paths.push(newPath)
		const closedPath = isClosedPath(path)
		path.forEach((p, i)=> {
			let prevPoint = path[i - 1]
			let nextPoint = path[i + 1]
			
			if i === 0
				if closedPath
					prevPoint = path[path.length - 2]
				else
					newPath.push(p)
					return
					
			else if i === path.length - 1
				if closedPath
					p = newPath[0]
				newPath.push(p)
				return
					
			const [cp1, cp2, r, angle] = getFilletControlPoint(prevPoint, p, nextPoint, rounded)
			const startsAngle = getAngleOfPointOnCircle(p, prevPoint) - 180 - angle
			newPath.push(cp1)
			newPath.push(cp2.concat(p, r, startsAngle, startsAngle + angle).map(v=> fixNumber(v)))
		})
	})
	
	return paths