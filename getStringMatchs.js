//#!py
function getStringMatchs(str, regx)
	const matchs = []
	let match
	while match = regx.exec(str)
		delete match.input
		matchs.push(match)
		if !regx.global
			break
			
	return matchs