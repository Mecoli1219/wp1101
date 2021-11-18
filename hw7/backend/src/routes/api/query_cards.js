import models from "../../mongo.js"

export default async(req, res) =>{
    const {type, queryString} = req.query
    const search = {}
    search[type] = queryString
    const datas = await models.ScoreCard.find(search)
    if (datas.length > 0){
        var messages = []
        datas.map((data)=>{
            const { name, subject, score } = data
            const message = `${name}\t${subject}\t${score}`
            messages = [...messages, message]
        })
        res.json({messages, datas})
    } else {
        res.json({message: `${type} (${queryString}) not found!`, datas})
    }
}

