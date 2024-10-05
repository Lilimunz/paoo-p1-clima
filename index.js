
require('dotenv').config()
const axios = require('axios')

const {
    PROTOCOL,
    BASE_URL,
    LIMIT,
    APPID
} = process.env

const url =`${PROTOCOL}://${BASE_URL}?q=${"São Paulo"}&limit=${LIMIT}&appid=${APPID}`

axios.get(url)
.then((res) =>{
    console.log(`A latitude eh: ${res.data.coord.lat}`)
    console.log(`A longitude eh: ${res.data.coord.lon}`)
    return res.data
})

.catch((res) =>{
    console.log("O nome digitado não foi encontrado, verifique.")
})

