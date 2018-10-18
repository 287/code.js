//#!py
function splitGeojson(geojson)
	const properties = []
	const coordinates = []
	geojson.features.forEach((item)=> {
		properties.push(item.properties)
		coordinates.push(item.geometry.coordinates)
	})
	
	return {
		properties,
		coordinates,
	}