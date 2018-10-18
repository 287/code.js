/**
 * @param {object} op
 * @param {number} op.total - 总计条数
 * @param {number} op.page - 每页条数
 * @param {number} op.page - 当前页码
 * @param {number} op.tpl - 每个页码按钮的模版： {page} 会被替换成页码 eg: <a class="{current}" href="article?p={page}">{page}</a>
 * @param {number} op.tplcur - 当前页码按钮的模版
 * @return {string}
 */
function createPageNav(op){
	var total = op.total || 0, pieces = op.pieces || 1, page = op.page || 1;
	var html = '', tpl;
	var count = Math.ceil(total / pieces);
	for(var i = 1; i <= count; i++){
		tpl = i == page  ? op.tplcur || op.tpl : op.tpl;
		html += (tpl || '').replace(/\{([a-z]+)\}/g, function(t, m){
			return ({
				page: i,
				current: i == page ? 'current' : ''
			})[m] || '';
		});
	}
	return html;
}

document.body.innerHTML = createPageNav({
	total: 100,
	pieces: 20,
	page: 2,
	tpl: '<a href="#/article/page/{page}" class="{current}">{page}</a>',
	tplcur: '<span class="{current}">{page}</span>',
})


var a = 1 + 2 * 3 - fn() ? 4 ? d[:2] : e : 5 + 6 > b ? 7 : c || 8
	a.a.a.a.a.a.a.a.a()
	a['adasdasdsadsadsadasdasdsadasdasdsadasdsadasd']
	a['adasdasdsadsadsadasdasdsadasdasdsadasdsadasd']['sadsadasda'][0][a().b()].a
		dasda
		asdsad
		asdasdsa
		sadasdas
		asdasdas
		sadasda
			asdasda
			asdasdasd
		f