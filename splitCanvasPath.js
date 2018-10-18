//#!py
/**
 * @include eachPointPath isClosedPath
 * @param {array<array>} path
 * @return {string}
 */
function splitCanvasPath(path)

const w = 2000
const h = 1000

/**
 * @include createCanvasNode
 */
canvas = createCanvasNode({
	width: w,
	height: h,
})
document.body.innerHTML = ''
document.body.append(canvas)

ctx = canvas.getContext('2d')

ctx.globalCompositeOperation = 'multiply'
ctx.translate(-.5,-.5)

ctx.save()
ctx.beginPath()
ctx.strokeStyle = 'rgba(255, 0, 0, .5)'
ctx.rect(1, 1, 4, 3)
ctx.rect(100, 100, 400, 300)
ctx.stroke()
ctx.restore()
ctx.save()
ctx.beginPath()
ctx.strokeStyle = 'rgba(0, 255, 0, .5)'
ctx.rect(20, 20, 180, 180)
ctx.stroke()
ctx.restore()
ctx.save()
ctx.beginPath()
ctx.strokeStyle = 'rgba(0, 0, 255, .5)'
ctx.rect(120, 120, 180, 180)
ctx.stroke()
ctx.restore()

ctx.save()
ctx.beginPath()
ctx.strokeStyle = 'rgba(0, 25, 255, .5)'
ctx.moveTo(100, 100)
ctx.quadraticCurveTo(300, 120, 180, 180)
ctx.moveTo(300, 120)
ctx.arc(300, 120,5,0,2*Math.PI)
ctx.stroke()
ctx.restore()


imageData = ctx.getImageData(0, 0, w, h)
data = imageData.data
const time = Date.now()
console.log('finish', getPointsFromCanvasImageDataByCrossPixel(imageData), Date.now() - time)
/**
 * @include getPixelFromCanvasImageData
 */
function getPointsFromCanvasImageDataByCrossPixel(imageData)
	const points = []
	let index, r, g, b
	for let x = 0; x < imageData.width; x++
		for let y = 0; y < imageData.height; y++
			[r, g, b] = getPixelFromCanvasImageData(imageData, x, y)
			if (r !== 0 && g !== 0) || (r !== 0 && b !== 0) || (g !== 0 && b !== 0)
				points.push([x, y, r, g, b])
	return points