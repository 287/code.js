function numberFormatter(num, ratio, utils, fixedUtil){
	var index = 0
	, ratios = []
	;
	if(ratio && typeof ratio === 'object'){
		ratios = ratio;
	}
	
	ratio = ratios[index] || ratio;
	
	while(num >= ratio && index < utils.length && fixedUtil !== utils[index]){
		index++;
		num = num / ratio;
		ratio = ratios[index] || ratio;
	}
	return num + utils[index < utils.length ? index : index - 1];
}

function numberFormat(num, utils){
	return numberFormatter(num, 1000, ['', 'k', 'm'])
}

function timeFormat(num, utils){
	return numberFormatter(num, [1000, 60, 60, 24, 7, 30, 12], ['ms', 's', 'i', 'h', 'd', 'w', 'm', 'y']);
}

function bitFormat(num, utils){
	return numberFormatter(num, 1024, ['b', 'k', 'm', 'g', 't']);
}
