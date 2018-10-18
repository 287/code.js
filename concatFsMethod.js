//#!py
/**
 * @include splitSimple
 */
function concatFsMethod(names, async)
	names = splitSimple(names)
	let nameSyncs = names.slice(0)
	let nameAsyncs = nameSyncs.map(name => name += 'Async')
	
	if async
		names = names.concat(nameAsyncs)
	
	console.log('@include '+ names.join(' '))
	
	let modeType = async ? 'Async' : 'Sync'
	let modeContent = async ? nameSyncs.map(name=> `\t${name}: ${name}Async`).join(',\n') : '\t' + nameSyncs.join(',\n\t')
	
	console.log(`const fs${modeType} = {\n${modeContent}\n}`)
	
concatFsMethod('writeFile readFile readJsonFile readDir isFile')
concatFsMethod('writeFile readFile readJsonFile readDir isFile', true)