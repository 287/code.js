/**
 * @include httpGet, httpPost, isArray, arrayRemoveValue
 */
function getTranslation(text, op, cb){
	if(!cb){
		cb = op;
		op = {};
	}
	var keys = ['en', 'zh'];
	
	if(/^[a-z0-9 ._-]/i.test(text)){
		op.from = keys[0];
		op.to = keys[1];
	}else{
		op.from = keys[1];
		op.to = keys[0];
	}
	/*!exchange
	{
		third: '第三人称单数',
		pl: '复数',
		ing: '现在分词',
		past: '过去式',
		done: '过去分词',
		er: '比较级',
		est: '最高级',
	}
	*/
	var item = {
		marks: [],
		exchanges: {},
		parts: [],
		symbol: '',
		means: [],
		input: text,
		output: '',
		source: '',
		target: '',
	};
	var load = getFromBaiduV2;
	var parse = parseBaiduV2;
	
	load(text, op, (err, rs)=>{
		if(err)
			return cb(err);
		if(!rs)
			return cb('get null');
		
		rs = parse(rs);
		if(!rs)
			return cb('parse null');
		
		rs = Object.assign(item, rs);
		cb(null, rs);
	});
	
	
	function parseBaiduV2(json){
		var item = {
			marks: [],
			exchange: {},
			parts: [],
			symbol: '',
			input: '',
			output: '',
			source: '',
			target: '',
		};
		var simple_means = json.dict_result.simple_means;
		if(simple_means){
			// var symbols = simple_means.symbols;
			// symbols && symbols.forEach((symbols)=>{
				// item.parts = symbols.parts.map(item=> [item.part || item.part_name].concat(item.means));
				// item.symbol = symbols.ph_am || symbols.word_symbol;
			// });
			var symbols = simple_means.symbols[0];
			if(symbols){
				item.parts = symbols.parts.map(item=> [item.part || item.part_name].concat(item.means));
				item.symbol = symbols.ph_am || symbols.ph_en || symbols.ph_other || symbols.word_symbol;
			}
			var exchange = simple_means.exchange;
			if(exchange){
				for(var key in exchange){
					var value = exchange[key];
					key = key.replace(/^word_/, '');
					if(isArray(value)){
						value = value[0];
					}
					if(value){
						item.exchange[key] = value;
					}
				}
			}
			
			if(simple_means.tags){
				item.marks = [].concat(simple_means.tags.core, simple_means.tags.other);
			}
			item.input = simple_means.word_name;
			item.means = simple_means.word_means;
		}
		
		var trans_result = json.trans_result;
		item.output = trans_result.data[0].dst
		item.source = trans_result.from
		item.target = trans_result.to
		
		for(var key in item){
			let value = item[key];
			if(value == null || value === ''){
				delete item[key]
			}else if(isArray(value)){
				arrayRemoveValue(value, '');
			}
		}
		
		return item;
	}
	
	function getFromBaiduV2(text, op, cb){
		// httpPost('http://fanyi.baidu.com/transapi', {
		httpPost('http://fanyi.baidu.com/v2transapi', {
			from: op.from || 'en',
			to: op.to || 'zh',
			query: text,
			simple_means_flag: 3,
		}, (err, rs)=>{
			cb(err, err ? null : JSON.parse(rs.toString()))
		});
	}
	
	
	function parseBingSerpHoverTrans(text){
		
		
	}
	function getFromBingSerpHoverTrans(text){
		//cn.bing.com/dict/SerpHoverTrans?q=
		
	}
}
