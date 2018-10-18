//#!py
function getPixelFromCanvasImageData(imageData, x, y)
	const index = (y * imageData.width + x) * 4
	return imageData.data.subarray(index, index + 4)