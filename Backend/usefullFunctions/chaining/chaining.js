const api_call = require('../APIcalling')

const chaining = async (mode, data, relationType, appendType, res) => {

    let currentId = data;
    const id = [];

    try {
        while (true) {

            const api_data = await api_call(mode, currentId)

            const hasData = api_data?.find(r => r.relation === relationType)

            if (!hasData) break

            const next_id = hasData.entry[0].mal_id;

            if (appendType === "unshift") {
                id.unshift(next_id)
            } else {
                id.push(next_id)
            }

            currentId = next_id;

            await new Promise(resolve => setTimeout(resolve, 700));
        }

    } catch (error) {
        return res.status(400).json({message: error})
        }
    return id
}

module.exports = chaining