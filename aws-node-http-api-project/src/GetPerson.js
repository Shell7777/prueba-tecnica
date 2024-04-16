/* global fetch */
const AWS = require('aws-sdk');
const GetPerson = async (event) => {
    AWS.config.update({ region: "us-east-1" });
    try {
        const parameters = event.pathParameters;
        let result = {}
        switch (parameters.opcion) {
            case "api":
                result.message = "entro"
                const url = 'https://swapi.py4e.com/api/people/'
                const response =  await fetch(url);
                result.data = await response.json();
                break;
            case "db":
                const dynamodb = new AWS.DynamoDB.DocumentClient();
                result = await dynamodb.scan({
                    TableName: 'PersonTable1',
                }).promise();
                break;
            default:
                result.message = "es swagger"

                break;
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: "Hubo un error"
        }
    }
}

const adaptarModeloToSpanish = (item) => {
    const adaptado = {}
    const traducciones = {
        "name": "nombre",
        "height": "altura",
        "mass": "peso",
        "hair_color": "color_de_cabello",
        "skin_color": "color_de_piel",
        "eye_color": "color_de_ojos",
        "birth_year": "año_de_nacimiento",
        "gender": "género",
        "homeworld": "planeta_natal",
        "films": "películas",
        "species": "especie",
        "vehicles": "vehículos",
        "starships": "naves_estelares",
        "created": "creado",
        "edited": "editado",
        "url": "url"
    };
    for (const clave in item) {
        if (traducciones.hasOwnProperty(clave)) {
            adaptado[traducciones[clave]] = objeto[clave];
        } else {
            adaptado[clave] = objeto[clave];
        }
    }
    return adaptado;
}


module.exports = {
    GetPerson
}