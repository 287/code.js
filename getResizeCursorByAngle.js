//#!py
/**
 * @include generateCursorImageDataWithAngle
 */
function getResizeCursorByAngle(angle = 0)
	angle = angle % 180
	select angle
		case 0
			return 'w-resize'
		case 45
			return 'nw-resize'
		case 90
			return 'n-resize'
		case 135
			return 'sw-resize'
		default
			const imageData = generateCursorImageDataWithAngle(angle)
			return `url(${imageData}) 12 12, default`