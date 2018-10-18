//#!py
/**
 * @include sizeKeys
 */
const defaultCursorImage = new Image
defaultCursorImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8wNS8xOPJprr8AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAABsElEQVRIie2UTUtbQRSG3zNG/Ak1+i+E2j8Q404EuW5NocvWrYEaF7mR6lbEf1BosxbbNKAbwXtTk60faFRocs0yITfkgzuvq7Fc/C6koPjCgeEcznNm5swZIYl+SfWN/Ap/efCIWRR+l0Rr6MXUCkTAfC77qMITk7MCQIsAGTvJ8bdjf/NIgiQct8hY3GK5fE41GNXG/5CpwahEhkZZqV4yFrfoFkqBiYXAJ6dn9H3/SXAAiAyNkiT/VLxQAXHcIhdTK9hY/4KRkWEAwNR0AiIIja6IAIDwlpEWEcnnsgCASvUSiffzWM4kiYnJWR4eHrNer7PRaLDZbNL3fbZaLbbbbXY6HXa7XfZ6PWqtGQQBtda8T+YEsufsM7W0ivW1ZUSjbwAAM9YHs9MbInkjJiLI/fgGAKh6NcwlPsFOJ6FEZMBOL+Dj/Gd4Xg0ksb2zy18/v4vWWhkjqbY2vyqSIV+5fDGwvbMbAmfsJJSCMg1Ve84+Y3GLBwdH//Raql6NsbhFxy3SxMT0xy2UFMkgtbQKAMjnsrffy53vXGCnF/BufOw67xreDz3fv+UV/v/hV7PPkL1k8qbpAAAAAElFTkSuQmCC'

function generateCursorImageDataWithAngle(angle = 0)
	angle = angle % 180
	if angle === 0
		return defaultCursorImage.src
		
	const global = defaultCursorImage
	if !global.canvas
		const size = [defaultCursorImage.naturalWidth, defaultCursorImage.naturalHeight]
		const canvas = document.createElement('canvas')
		sizeKeys.forEach((key, i)=> canvas[key] = size[i])
		const ctx = canvas.getContext('2d')
		Object.assign(defaultCursorImage, {
			size,
			ctx,
			canvas,
		})
		
	const {size, ctx, canvas} = global
	canvas.width = size[0]
	ctx.translate(canvas.width / 2, canvas.height / 2)
	ctx.rotate(angle * Math.PI / 180)
	ctx.drawImage(defaultCursorImage, -canvas.width / 2, -canvas.height / 2)
	return canvas.toDataURL('png', 1)