//#!py
/**
 * @include isNumberLike
 */
function stringifySimple(obj, space)
	return JSON.stringify(obj, (key, value)=> {
		if value && key !== '' && !isNumberLike(key)
			if !['Array', 'Object', 'RegExp', 'Boolean', 'Number', 'String'].includes(value.constructor.name)
				value = `<${value.constructor.name}>`
				
		if value
			select value.constructor.name
				case 'RegExp'
					value = value.toString()
					
				case 'Buffer'
					value = getBufferPreviewString(value)
					
				case 'Object'
					if value.type === 'Buffer' && value.data
						value = getBufferPreviewString(value.data)
						
		return value
	}, space)
	
	function getBufferPreviewString(buf, len = 30)
		return `<Buffer ${buf.slice(0, len)}${buf.length > len ? '...' : ''}>`