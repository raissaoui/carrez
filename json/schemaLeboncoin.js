{
	"$schema": "https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s",
    "title": "Leboncoin",
    "description": "Achatimmobilier",
    "type": "object",
		"properties": {
		"Prix": {
			"type": "integer"
		},
		"Ville": {
			"type": "string"
		},
		"Type de bien": {
			"type": "string"
		},
		"Pièces":{
			"type":"integer"
		},
		"Surface":{
			"type":"integer"
		}
	},
	"required": ["Prix", "Ville","Type de bien","Pièces","Surface"]
}
