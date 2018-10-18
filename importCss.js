//#!py
/**
 * @include loadCss
 * @param {string} names - css name
 * @return {undefined}
 */
function importCss(names)
	names.split(',').forEach((name)=>{
		loadCss(`http://localhost:6368/?/api/css/${name}`)
	})