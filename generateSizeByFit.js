//#!py
/**
 * @desc 在保持比例的同时缩放尺寸去适应目标尺寸
 * @param {array<number>} sourceSize
 * @param {array<number>} targetSize
 * @param {boolean} [notZoomIn = false]
 * @return {array<number>}
 */
function generateSizeByFit(sourceSize, targetSize, notZoomIn)
	if notZoomIn && sourceSize.every((v, i)=> v < targetSize[i])
		return sourceSize
	const ratios = sourceSize.map((v, i)=> v / targetSize[i])
	const ratio = Math.max(...ratios)
	return sourceSize.map(v=> v / ratio)
	