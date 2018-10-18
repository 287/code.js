//#!py
/**
 * split url path
 * @include splitOnce string2object eachObject
 * @param {string} path
 * @return {object}
 */
function splitUrlPath(path, withoutQueryPath)
	path = decodeURI(path)
	
	const rs = {
		path: path,
		pathname: '',
		pathnames: [],
		search: '',
		query: '',
		querys: {},
	}
	
	let [pathname, query] = splitOnce(path, '?')
	
	if pathname !== ''
		rs.pathname = decodeURIComponent(pathname)
		rs.pathnames = splitUrlPathname(rs.pathname)
	
	if query != null
		rs.query = query
		rs.search = '?' + rs.query
	
	if !withoutQueryPath && rs.query.charAt(0) === '/'
		rs.queryPath = splitUrlPath(rs.query)
		rs.querys = rs.queryPath.querys
	else
		rs.querys = string2object(rs.query, ['=', '&'])
		eachObject(rs.querys, (value, key, obj)=> obj[key] = decodeURIComponent(value))
	
	return rs
	
	function splitUrlPathname(path)
		let list = []
		path = path.replace(/^\/|\/$/g, '')
		if path !== ''
			list = path.split('/')
			list.forEach((value, i)=> {
				list[i] = decodeURIComponent(value);
			})
			
		return list