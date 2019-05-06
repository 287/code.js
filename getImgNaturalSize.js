//#!py
/**
 * @include sizeKeys toCapitalize
 * @param {imgelement} img
 * @return {array<number>}
 */
function getImgNaturalSize(img)
	return sizeKeys.map(key=> img[`natural${toCapitalize(key)}`])