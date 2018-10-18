//#!py
/**
 * @include eachPointPath offsetCanvasPoint getCanvasPointType isClosedPath
 * @param {canvascontext} ctx
 * @param {object} path
 * @param {array} [offset]
 * @return {undefined}
 */
function drawCanvasPath(ctx, path, offset)
	eachPointPath(path, (path)=> {
		let closedPath = isClosedPath(path)
		let lastPointIndex = path.length - (closedPath ? 2 : 1)
		
		path.forEach((p, i, path)=> {
			if i > lastPointIndex
				return
			
			let drawType = getCanvasPointType(p , i)
			
			if drawType
				if offset
					p = offsetCanvasPoint(p, offset)
				
				ctx[drawType](...p)
		})
		
		if closedPath
			ctx.closePath()
	})