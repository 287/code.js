//#!py
/**
 * @param {point<number>} p
 * @param {object} rect
 * @param {number} rect.left
 * @param {number} rect.top
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {boolean}
 */
function limitPonitInRect(p, rect)
	const ltKeys = ['left', 'top']
	const sizeKeys = ['width', 'height']
	p = p.slice(0)
	
	ltKeys.forEach((key, i)=> {
		p[i] = Math.max(p[i], rect[key])
		p[i] = Math.min(p[i], rect[key] + rect[sizeKeys[i]])
	})
	
	return p