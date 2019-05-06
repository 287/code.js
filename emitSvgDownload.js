//#!py
/**
 * @include sizeKeys
 * @include svg2dataUrl svg2img img2blob emitBlobDownload pipeAsync
 * @param {element} node
 * @param {string} key
 * @return {undefined}
 */
function emitSvgDownload(svg, type = 'png', name = 'svg')
	pipeAsync(
		(next)=> {
			if type === 'svg'
				// serializeNode(svg)
				next(null, svg2dataUrl(svg))
			else
				svg2img(svg, (err, img)=> {
					if err
						next(err)
					else
						img2blob(img, next, `image/${type}`)
				})
		},
		(err, blob)=> {
			if blob
				emitBlobDownload(blob, name + '.' + type)
			else
				console.log(err)
		}
	)