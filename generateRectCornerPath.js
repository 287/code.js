//#!py
/**
 * @include isArray
 * @return {array}
 */
function generateRectCornerPath(size, cornerSize = 5, op)
	cornerSize = isArray(cornerSize) ? cornerSize : [cornerSize, cornerSize]
	
	return [
		[
			[0, cornerSize[1]],
			[0, 0],
			[cornerSize[0], 0],
		],
		[
			[size[0] - cornerSize[0], 0],
			[size[0], 0],
			[size[0], cornerSize[1]],
		],
		[
			[size[0], size[1] - cornerSize[1]],
			[size[0], size[1]],
			[size[0] - cornerSize[0], size[1]],
		],
		[
			[cornerSize[0], size[1]],
			[0, size[1]],
			[0, size[1] - cornerSize[1]],
		],
	]
	