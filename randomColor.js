//#!py
/**
 * @include random
 * @param {number} [opacity = .8]
 * @return {string}
 */
function randomColor(opacity)
	return `hsla(${random(0, 360)}, 100%, ${random(40, 80)}%, ${opacity || .8})`