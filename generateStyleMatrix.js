//#!py
/**
 * @include isArray deg2rad
 * @param {string} type
 * @param {number} ratio
 * @param {number} [ratio2]
 * @return {array}
 */
function generateStyleMatrix(type, ...args)
	if isArray(args[0])
		args = args[0]
	select type
		case 'translate'
			if args.length === 1
				args.push(args[0])
			return [1, 0, 0, 1, args[0], args[1]]
			
		case 'scale'
			if args.length === 1
				args.push(args[0])
			return [args[0], 0, 0, args[1], 0, 0]
			
		case 'rotate'
			const rad = deg2rad(args[0])
			const [cos, sin] = ['cos', 'sin'].map(key=> Math[key](rad))
			return [cos, sin, -sin, cos, 0, 0]