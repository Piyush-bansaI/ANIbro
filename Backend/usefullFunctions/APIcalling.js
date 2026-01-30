const { default: axios } = require("axios");
const jiken = axios.create({baseURL: "https://api.jikan.moe/v4"})

const api_calling = async (mode, data) => {
    const getRelation = await jiken.get(`/${mode.toLowerCase()}/${data}/relations`)

    return getRelation?.data.data
}

module.exports = api_calling