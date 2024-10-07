require('dotenv').config()
const axios = require('axios')

const {
    PROTOCOL,
    BASE_URL_GEO,
    LIMIT,
    APPID,
    BASE_URL_DATA,
    CNT,
    UNITS,
    DESIRED_LANGUAGE
} = process.env

let cidade = "São Paulo"

const url =`${PROTOCOL}://${BASE_URL_GEO}?q=${cidade}&limit=${LIMIT}&appid=${APPID}`

axios.get(url)
// Se a requisição for bem-sucedida
.then((res) =>{
    const lat = res.data[0].lat
    const lon = res.data[0].lon
    // console.log(`Latitude: ${lat}, longitude: ${lon}`)
    return clima({lat, lon}) //variaveis sendo enviadas para a função async/clima em formas de objetos literais {}
    //Passar as coordenadas obtidas da primeira requisição para a função clima
})
.catch((error) =>{
    console.log("Algo deu errado, verifique.", error.message)
})

//coords é passado como parametro para que a função clima tenha acesso a essas informações e possa fazer a requisição com base na latitude e longitude 
const clima = async (coords) => {
    // Desestrutura as coordenadas do objeto passado como argumento lat e lon
    const { lat, lon } = coords 
    const url =`${PROTOCOL}://${BASE_URL_DATA}?lat=${lat}&lon=${lon}&appid=${APPID}&cnt=${CNT}&units=${UNITS}&lang=${DESIRED_LANGUAGE}`
    //try/catch - é utilizada para tratar erros que possam ocorrer durante a execução do código
    try {
    const resultado = await axios.get(url)

    const descricao = resultado.data.weather[0].description
    const feels_like = resultado.data.main.feels_like
        console.log(`
            Descrição: ${descricao},
            Sensação térmica: ${feels_like}\u00b0
        `)
} catch (error) {
    console.log("Algo deu errado com a requisição", error.message)
    }
}
