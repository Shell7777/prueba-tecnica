const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk')
const {validatePersonResponse} = require('./models/Person.model')
const crearModelo = ({nombre,idreferencia})=>{
    return {
        id: uuidv4(),
        nombre,
        idreferencia
    };
}

const Ok = (item)=>{
    return  {
        statusCode: 200,
        body: JSON.stringify({
            item,
            message:"Se ha credo exitosamente"
        })
    };
}

const BadRequest =(error)=>{
    return {
        statusCode: 500,
        body: JSON.stringify(error.message) 
    }
}

const AgregrarToDinamoDb = async (item)=>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();
        await dynamodb.put({
            TableName : 'PersonTable1',
            Item: item
        }).promise(); 
}

const main = async (event) => {
    AWS.config.update({ region: "us-east-1" }); 
    try {
        const  bodyData  = JSON.parse(event.body);
        validatePersonResponse(bodyData);
        const item = crearModelo(bodyData);
        await AgregrarToDinamoDb(item)
        return Ok(item)

    } catch (error) {
        return BadRequest(error);
    }
}

module.exports = {
    AddPerson: main
}