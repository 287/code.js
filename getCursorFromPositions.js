//#!py
/**
 * @desc 通过位置获取cursor
 * @include lrKeys ltKeys rbKeys
 * @param {array<string>} positions
 * @return {string}
 */
function getCursorFromPositions(positions)
	let cursor
	select positions.length
		case 1
			cursor = `${'nw'[lrKeys.includes(positions[0]) >> 0]}-resize`
		case 2
			let isIn = ltKeys.every(key=> positions.includes(key)) || rbKeys.every(key=> positions.includes(key))
			cursor = `${['nw', 'sw'][!isIn >> 0]}-resize`
	return cursor