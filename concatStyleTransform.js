//#!py
/**
 * @include generateStyleMatrix concatStyleMatrix
 * @param {array<array<string,number>>} tranforms
 * @return {array}
 */
function concatStyleTransform(tranforms)
	const matrixs = tranforms.map(tranform=> generateStyleMatrix(...tranform))
	return concatStyleMatrix(...matrixs)