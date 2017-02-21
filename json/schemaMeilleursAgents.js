{
	"$schema": "https://www.meilleursagents.com/prix-immobilier/#estimates",
    "title": "Meilleursagents",
    "description": "EstimationAchatimmobilier",
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
		"SurfaceMinimale":{
			"type":"integer"
		},
		"SurfaceMaximale":{
			"type":"integer"
		}
	},
	"required": ["Prix", "Ville","Type de bien","Pièces","SurfaceMinimale","SurfaceMaximale"]
}
