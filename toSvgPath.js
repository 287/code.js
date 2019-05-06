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
					
				case 7
					type = 'A'
					// x, y, radius, startAngle, endAngle
					// [rx, ry, x-axis-rotation, large-arc-flag, counterclockwise-flag, x, y]
					
					// x, y, originX, originY, r, startAngle, endAngle
					const value = (p[6] - p[5]) % 360
					if value === 0 && p[6] != p[5]
						const origin = []
						for let i = 0; i < 2; i++
							origin[i] = p[i + 2] - (p[i] - p[i + 2])
						d.push(type, p[4], p[4], 0, 0, 1, ...origin)
							
					p = [p[4], p[4], 0, (Math.abs(value) > 180) >> 0, (value >= 0) >> 0, p[0], p[1]]
					// p = [p[4], p[4], 0, (Math.abs(value) > 180) >> 0, (value > 0) >> 0, p[0], p[1]]
					
				case 6
					type = 'C'
					p = p.slice(2, 6).concat(p.slice(0, 2))
					
			d.push(type, ...p)
		})
		
		if isClosedPath(path)
			d.push('Z')
	})
	// console.log(d.join(' '))
	return d.join(' ')