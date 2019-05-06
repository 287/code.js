//#!py
/**
 * @require iconv-lite:iconv
 * @include readFile csv2array
 */
function readCsvFile(path)
	let csv = readFile(path)
	csv = iconv.decode(csv, 'gbk')
	const tableArray = csv2array(csv)
	return tableArray