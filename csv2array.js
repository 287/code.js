//#!py
/**
 * @include getFirstLine trim string2array
 * @param {string} csv
 * @param {string} [sepChr]
 * @return {array<array>}
 */
function csv2array(csv, sepChr)
	csv = trim(csv)
	
	if !sepChr
		let seps = ['\t', ',']
		let firstLine = getFirstLine(csv)
		sepChr = seps.find(sep=> firstLine.includes(sep)) || seps[0]
			
	return string2array(csv, ['\n', sepChr], {
		trimValue: true,
		trimQuote: true,
	})