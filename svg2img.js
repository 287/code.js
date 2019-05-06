//#!py
/**
 * @include pipeAsync eachAsync loadImage img2dataUrl
 * @param {svgelement} svg
 * @param {string} type
 * @return {imgelement}
 */
function svg2img(svg, cb)
	const img = new Image
	const catchError = true
	/**
	 * @include sizeKeys
	 * @include toCapitalize
	 */
	sizeKeys.forEach(key=> img[key] = svg.getAttribute(key) || svg[`client${toCapitalize(key)}`])
	
	svg = svg.cloneNode(true)
	
	pipeAsync(
		// 解析图片节点
		(next)=> eachAsync(
			svg.querySelectorAll('image, img'),
			(next, image)=> {
				const src = image.tagName === 'image' ? image.getAttribute('href') : image.src
				if !src || src.startsWith('data:')
					return next()
					
				loadImage(src, (err, img)=> {
					if !err
						const dataUrl = img2dataUrl(img)
						image.tagName === 'image' ? image.setAttribute('href', dataUrl) : (image.src = dataUrl)
						
					else if catchError
						err = null
						
					next(err)
				})
			},
			5,
			next
		),
		// 解析背景图片节点
		(next)=> 
			/**
			 * @include serializeNode
			 */
			let xml = serializeNode(svg)
			/**
			 * @include matchAll
			 */
			const matchs = matchAll(xml, /url\((\&quot;)?((https?:)?\/\/[^"]+?)(\&quot;)?\)/g)
			const dataUrls = []
			eachAsync(
				matchs,
				(next, match, i)=> loadImage(match[2], (err, img)=> {
					if !err
						const dataUrl = img2dataUrl(img)
						dataUrls[i] = `url(${dataUrl})`
						
					else if catchError
						err = null
						dataUrls[i] = ''
						
					next(err)
				}),
				5,
				(err)=> 
					let rs
					
					if !err
						/**
						 * @include replaceStringByMatchs
						 */
						xml = replaceStringByMatchs(xml, matchs, dataUrls)
						/**
						 * @include svg2dataUrl
						 */
						rs = svg2dataUrl(xml)
						
					next(err, rs)
			)
		(next, dataUrl)=> loadImage(dataUrl, next),
		cb
	)