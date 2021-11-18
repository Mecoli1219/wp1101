import models from "../../mongo.js"

export default async(req, res) =>{
    var {name, subject, score} = req.body
    score = score * 1
    const data = await models.ScoreCard.findOne({name, subject})
    if (data){
        await models.ScoreCard.updateOne({name, subject}, {score})
        res.json({message: `Updating (${name}, ${subject}, ${score})`, card: {...data, score}})
    } else {
        const ScoreCardDocument = new models.ScoreCard({name, subject, score})
        await ScoreCardDocument.save()
        res.json({message: `Adding (${name}, ${subject}, ${score})`, card: ScoreCardDocument})
    }
}

