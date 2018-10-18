//#!py
/**
 * @include isPureObject sizeKeys eachPointPath eachPointPathMap parsePointByMercator generateZoomAndTranslateToFitRectWithinSize generateRectByTwoPoints getPathBounds
 * @param {array} path
 * @return {array}
 */
function parsePathByMercator(path, wrapSize)
	if isPureObject(wrapSize)
		wrapSize = sizeKeys.map(key=> wrapSize[key])
		
	const mathKeys = ['min', 'max']
	const bounds = []
	
	// get bounding of path
	eachPointPath(path, (path)=> {
		path.forEach((p)=> {
			p = parsePointByMercator(p)
			
			if bounds.length === 0
				bounds.push(
					p.slice(0),
					p.slice(0),
				)
			else
				for let index = 0; index < 2; index++
					for let i = 0; i < 2; i++
						bounds[index][i] = Math[mathKeys[index]](p[i], bounds[index][i])
		})
	})
	
	// get zoom and translate to fit wrapSize
	const {zoom, translate} = generateZoomAndTranslateToFitRectWithinSize(generateRectByTwoPoints(...bounds), wrapSize)
	
	// generate new path
	return eachPointPathMap(path, (path)=> {
		return path.map(p=> {
			p = parsePointByMercator(p)
			p.forEach((v, i)=> {
				v += translate[i]
				p[i] = v * zoom
			})
				
			return p
		})
	})