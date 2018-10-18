//#!py
/**
 * @include eachPointPath isClosedPath
 * @param {array<array>} path
 * @return {string}
 */
function toSvgPath(path)
	const d = []
	eachPointPath(path, (path)=> {
		path.forEach((p, i)=> {
			if i === 0
				if p.length !== 2
					p = p.slice(0, 2)
					// d.push('M', ...p.slice(0, 2))
					
			
			let type = 'L'
			select p.length
				case 2
					type = i === 0 ? 'M' : type
				
				case 4
					type = 'Q'
					p = p.slice(2, 4).concat(p.slice(0, 2))
					
				case 5
					type = 'A'
					// [rx, ry, x-axis-rotation, large-arc-flag, counterclockwise-flag, x, y]
					let value = (p[3] - p[2]) % 360
					// console.log(p[2], p[3], value)
					// let param = []
					// if value > 180
						// param.push(1, 1)
					// else
						// param.push(0, 1)
					// if p[3] !== p[2]
						// if value % 360 === 0
							// p[1] -= 1
							// p[0] -= 1
					// value = value < 180 ? 1 : 0
					p = [p[4], p[4], 0, (Math.abs(value) > 180) >> 0, (p[3] > p[2]) >> 0, p[0], p[1]]
					
				
				case 6
					type = 'T'
					
			d.push(type, ...p)
		})
		
		if isClosedPath(path)
			d.push('Z')
	})
	console.log(d.join(' '))
	return d.join(' ')