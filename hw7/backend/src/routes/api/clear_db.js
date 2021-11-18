import models from "../../mongo.js"

export default (req, res) =>{
    Object.keys(models).map(async(key)=>{
        await models[key].deleteMany({})
    })
    res.json({message: "Database cleared"})
}

